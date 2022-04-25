const express = require("express");
const router = express.Router();
const data = require("../data");
const filesData = data.files;

// Configure multer file uploading
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage }).single("userData");

router.post("/", async (req, res) => {
  // Validation
  let iosFileType = req.header("iostype");
  if (!iosFileType)
    return res.json({
      serverState: "uploadError",
      error: "request missing header: iostype",
    });
  upload(req, res, async (err) => {
    if (err) return res.json({ serverState: "uploadError", error: err });
    let file = req.file;
    console.log("iostype: " + iosFileType + "\n", "mimetype: " + file.mimetype);
    try {
      let insertResult = await filesData.addFile(
        file.filename,
        file.originalname,
        file.mimetype,
        iosFileType,
        file.size
      );
      if (insertResult.fileAdded)
        res.json({ serverState: "uploadSuccess", filename: file.originalname });
    } catch (e) {
      console.log(e);
      res.json({ serverState: "uploadError", error: e });
    }
  });
});

module.exports = router;
