const files = require("../config/mongoCollections").files;
const { ObjectId } = require("mongodb");

module.exports = {
  addFile: async (
    serverFilename,
    userFilename,
    mimetype,
    iostype,
    sizeInBytes
  ) => {
    const filesCollection = await files();
    const insertInfo = await filesCollection.insertOne({
      serverFilename: serverFilename,
      userFilename: userFilename,
      mimetype: mimetype,
      iostype: iostype,
      sizeInBytes: sizeInBytes,
    });
    if (insertInfo.insertedCount <= 0) throw "mongoDB insertion failed";
    return { fileAdded: true };
  },
};
