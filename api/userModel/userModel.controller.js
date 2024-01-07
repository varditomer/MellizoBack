// userModel.controller.js
const userModelService = require('./userModel.service');

const uploadModel = async (req, res) => {
  console.log("entered uploadModel -controller")

  try {
    const userId = req.body.userId;
    const userEmail = req.body.userEmail;
    const modelName = req.body.modelName;
    const description = req.body.description;
    await userModelService.uploadModel(req.files, userId, userEmail,modelName, description);
    res.status(200).send('Model uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading Model');
  }
};

const getByEmail = async (req, res) => {
  try {
      const userEmail = req.params.email;
      const files = await userModelService.getByEmail(userEmail);
      res.json(files);
  } catch (error) {
      res.status(500).send('Error retrieving files');
  }
};

const getModelFilePath = async (req, res) => {
  try {
    const modelName = req.params.modelName;
    const model = await userModelService.getByModelName(modelName);
    if (!model) {
      return res.status(404).send('Model not found');
    }
    res.json({ filePath: model.storagePath });
  } catch (error) {
    res.status(500).send('Error retrieving model file path');
  }
};



const downloadFile = async (req, res) => {
  console.log("entered downloadFile in controller")
  try {
    const fileId = req.params.fileId;
    const file = await userModelService.getFileById(fileId);
    
    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = file.storagePath;
    console.log(filePath)
    res.download(filePath, file.originalName);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file');
  }
};

const storeFeedback = async (req, res) => {
  console.log("feedback controller")

  try {
    const userEmail = req.body.userEmail;
    const feedback = req.body.feedback;
    await userModelService.storeFeedback(userEmail, feedback);
    res.status(200).send('Feedback stored successfully');
  } catch (error) {
    console.error('Error storing feedback:', error);
    res.status(500).send('Error storing feedback');
  }
};


module.exports = {
  uploadModel,
  getByEmail,
  downloadFile,
  getModelFilePath,
  storeFeedback
};
