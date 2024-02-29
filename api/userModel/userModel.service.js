//userModel.service:
const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;


const uploadModel = async (files, userId, userEmail, modelName, modelDescription) => {
  try {

    const ModelCollection = await dbService.getCollection('userModel');
    let insertedId = null; // This will store the last inserted ID

    for (const file of files) {
      const storagePath = path.join(__dirname, 'modelsFilesuploads', `${Date.now()}-${file.originalname}`);
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

      const result = await ModelCollection.insertOne(modelRecord);
      insertedId = result.insertedId; // Store the last insertedId
    }
    return insertedId;
  } catch (error) {
    console.error('Error in storeModel:', error);
    throw error;
  }
};


const getByEmail = async (email) => {
  const collection = await dbService.getCollection('userModel');
  return await collection.find({ userEmail: email }).toArray();
};

const getRecentByEmail = async (email) => {
  const collection = await dbService.getCollection('userModel');
  
  // Sort by _id in descending order to get the most recent document
  return await collection.findOne(
    { userEmail: email },
    { sort: { _id: -1 } } // Using _id to determine the most recent document
  );
};

const getFilePathByModelID = async (modelID) => {

  try {
    const collection = await dbService.getCollection('userModel');
    const id = new ObjectId(modelID); // Convert modelID to ObjectId
    const model = await collection.findOne({ _id: id });
    return model;
  } catch (error) {
    console.error('Error in getByModelName:', error);
    throw error;
  }
};

const getFileById = async (fileId) => {
  const collection = await dbService.getCollection('userModel');
  const file = await collection.findOne({ _id: new ObjectId(fileId) });
  return file;
};

const storeFeedback = async (userEmail, feedback) => {
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
  getRecentByEmail,
  getFileById,
  storeFeedback,
  getFilePathByModelID
};
