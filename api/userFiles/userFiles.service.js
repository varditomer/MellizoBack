const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');

const uploadFiles = async (files, userId, userEmail) => {
  try {
    console.log("entered storeFiles function -service")

    const filesCollection = await dbService.getCollection('userFiles');

    for (const file of files) {
      const storagePath = path.join(__dirname, 'uploads', `${Date.now()}-${file.originalname}`);
      fs.renameSync(file.path, storagePath);

      const fileRecord = {
        userId: userId,
        userEmail: userEmail,
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


module.exports = {
  uploadFiles,
  getByEmail
};
