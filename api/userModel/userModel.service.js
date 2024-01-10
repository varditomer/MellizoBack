//userModel.service:
const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;


const uploadModel = async (files, userId, userEmail, modelName, modelDescription) => {
  try {
    console.log("entered store Model function -service")

    const ModelCollection = await dbService.getCollection('userModel');

    for (const file of files) {
      const storagePath = path.join(__dirname, 'uploads', `${Date.now()}-${file.originalname}`);
      fs.renameSync(file.path, storagePath);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const modelRecord = {
        userId: userId,
        userEmail: userEmail,
        modelName: modelName,
        description: modelDescription,
        dateUploaded: formattedDate,
        originalName: file.originalname,
        storagePath: storagePath,
        mimeType: file.mimetype,
        size: file.size,
      };

      await ModelCollection.insertOne(modelRecord);
    }
  } catch (error) {
    console.error('Error in storeModel:', error);
    throw error;
  }
};


const getByEmail = async (email) => {
  console.log("entered getByEmail of userModel.service")
  const collection = await dbService.getCollection('userModel');
  return await collection.find({ userEmail: email }).toArray();
};

const getByModelName = async (modelName) => {
  try {
    const collection = await dbService.getCollection('userModel');
    const model = await collection.findOne({ modelName: modelName });
    return model;
  } catch (error) {
    console.error('Error in getByModelName:', error);
    throw error;
  }
};

const getFileById = async (fileId) => {
  console.log("entered get file by id")
  const collection = await dbService.getCollection('userModel');
  const file = await collection.findOne({ _id: new ObjectId(fileId) });
  return file;
};

const storeFeedback = async (userEmail, feedback) => {
  console.log("feedback service")
  try {
    const feedbackCollection = await dbService.getCollection('feedback');
    const feedbackRecord = {
      userEmail,
      feedback,
      timestamp: new Date(),
    };
    await feedbackCollection.insertOne(feedbackRecord);
  } catch (error) {
    console.error('Error in storeFeedback:', error);
    throw error;
  }
};




module.exports = {
  uploadModel,
  getByEmail,
  getFileById,
  storeFeedback,
  getByModelName
};
