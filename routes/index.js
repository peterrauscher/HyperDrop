const receiveRoutes = require("./receive");
// const responseRoutes = require("./send");
// const feedRoutes = require("./feed");

const constructorMethod = (app) => {
  // TODO Authenticated users only - display upload logs
  // app.use("/feed", feedRoutes);
  app.use("/upload", receiveRoutes);

  // app.use("/download", responseRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
