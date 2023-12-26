// userFiles.controller.js
const userFilesService = require('./userFiles.service');

const uploadFiles = async (req, res) => {
  console.log("entered uploadFiles -controller")

  try {
    const userId = req.body.userId;
    const userEmail = req.body.userEmail;
    await userFilesService.uploadFiles(req.files, userId, userEmail);
    res.status(200).send('Files uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading files');
  }
};

const getByEmail = async (req, res) => {
  try {
      const userEmail = req.params.email;
      const files = await userFilesService.getByEmail(userEmail);
      res.json(files);
  } catch (error) {
      res.status(500).send('Error retrieving files');
  }
};

module.exports = {
  uploadFiles,
  getByEmail
};
