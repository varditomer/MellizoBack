// userFiles.controller.js
const userFilesService = require('./userFiles.service');

const uploadFiles = async (req, res) => {
  try {
    await userFilesService.storeFiles(req.files);
    res.status(200).send('Files uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading files');
  }
};

module.exports = {
  uploadFiles,
};
