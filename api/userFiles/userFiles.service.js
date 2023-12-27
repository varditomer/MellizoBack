const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;


const uploadFiles = async (files, userId, userEmail, description) => {
  try {
    console.log("entered storeFiles function -service")

    const filesCollection = await dbService.getCollection('userFiles');

    for (const file of files) {
      const storagePath = path.join(__dirname, 'uploads', `${Date.now()}-${file.originalname}`);
      fs.renameSync(file.path, storagePath);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      
      const fileRecord = {
        userId: userId,
        userEmail: userEmail,
        description: description,
        dateUploaded: formattedDate,
        originalName: file.originalname,
        storagePath: storagePath,
        mimeType: file.mimetype,
        size: file.size,
      };

      await filesCollection.insertOne(fileRecord);
    }
  } catch (error) {
    console.error('Error in storeFiles:', error);
    throw error;
  }
};

const getByEmail = async (email) => {
  console.log("entered getByEmail of userFiles.service")
  const collection = await dbService.getCollection('userFiles');
  return await collection.find({ userEmail: email }).toArray();
};

const getFileById = async (fileId) => {
  console.log("entered get file by id")
  const collection = await dbService.getCollection('userFiles');
  const file = await collection.findOne({ _id: ObjectId(fileId) });
  return file;
};


module.exports = {
  uploadFiles,
  getByEmail,
  getFileById
};
