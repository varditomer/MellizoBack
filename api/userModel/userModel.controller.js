// userModel.controller.js
const userModelService = require('./userModel.service');

const uploadModel = async (req, res) => {

  try {
    const {userId,
      userEmail,
      modelName,
      description
    } = req.body

    const insertedId = await userModelService.uploadModel(req.files, userId, userEmail,modelName, description);
    // res.status(200).send('Model uploaded successfully');
    res.status(200).json({insertedId}); // Send the created model back, including its ID
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
const getRecentByEmail = async (req, res) => {
  try {
    
      const userEmail = req.params.email;
      const recentModel = await userModelService.getRecentByEmail(userEmail);
      res.json(recentModel);
  } catch (error) {
      res.status(500).send('Error retrieving recentModel');
  }
};

const getModelFilePath = async (req, res) => {
  try {
    const modelID = req.params.modelID;
    const model = await userModelService.getFilePathByModelID(modelID);
    if (!model) {
      return res.status(404).send('Model not found');
    }
    res.json(model);
  } catch (error) {
    res.status(500).send('Error retrieving model file path');
  }
};



const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await userModelService.getFileById(fileId);
    
    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = file.storagePath;
    res.download(filePath, file.originalName);
  } catch (error) {
    res.status(500).send('Error downloading file');
  }
};

const storeFeedback = async (req, res) => {

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
  getRecentByEmail,
  downloadFile,
  getModelFilePath,
  storeFeedback
};
