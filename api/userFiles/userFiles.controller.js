// userFiles.controller.js
const userFilesService = require('./userFiles.service');

const uploadFiles = async (req, res) => {
  console.log("entered uploadFiles -controller")

  try {
    const userId = req.body.userId;
    const userEmail = req.body.userEmail;
    const description = req.body.description;
    await userFilesService.uploadFiles(req.files, userId, userEmail,description);
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



const downloadFile = async (req, res) => {
  console.log("entered downloadFile in controller")
  try {
    const fileId = req.params.fileId;
    const file = await userFilesService.getFileById(fileId);
    
    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = file.storagePath;
    res.download(filePath, file.originalName);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file');
  }
};


module.exports = {
  uploadFiles,
  getByEmail,
  downloadFile
};
