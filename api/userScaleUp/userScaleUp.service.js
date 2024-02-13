//userScaleUp.service:
const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;


const uploadScaleUp = async (files, userId, userEmail, scaleUpName, scaleUpDescription, bioreactorParams, cellParams) => {
    try {

        const ScaleUpCollection = await dbService.getCollection('userScaleUp');

        // Extract the files
        const ourFile = files.ourFiles[0]; // Assuming only one file
        const otrFile = files.otrFiles[0]; // Assuming only one file
        // Function to get storage path and move file
        const getStoragePath = (file) => {
            const storagePath = path.join(__dirname, 'scaleUpFilesUploads', `${Date.now()}-${file.originalname}`);
            fs.renameSync(file.path, storagePath);
            return storagePath;
        };
        // Process files
        const ourStoragePath = getStoragePath(ourFile);
        const otrStoragePath = getStoragePath(otrFile);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Creating one record with both files' details
        const scaleUpRecord = {
            userId,
            userEmail,
            scaleUpName,
            scaleUpDescription,
            bioreactorParams:bioreactorParams._value,
            cellParams: cellParams._value,
            dateUploaded: formattedDate,
            ourOriginalName: ourFile.originalname,
            ourStoragePath: ourStoragePath,
            ourMimeType: ourFile.mimetype,
            ourSize: ourFile.size,
            otrOriginalName: otrFile.originalname,
            otrStoragePath: otrStoragePath,
            otrMimeType: otrFile.mimetype,
            otrSize: otrFile.size
        };

        await ScaleUpCollection.insertOne(scaleUpRecord);

    } catch (error) {
        console.error('Error in store Scale Up:', error);
        throw error;
    }
};


const getByEmail = async (email) => {
    const collection = await dbService.getCollection('userScaleUp');
    return await collection.find({ userEmail: email }).toArray();
};
// const getByName = async (scaleUpName) => {
//     console.log("entered getByEmail of userScaleUp.service")
//     const collection = await dbService.getCollection('userScaleUp');
//     return await collection.find({ userEmail: email }).toArray();
// };

const getRecentByEmail = async (email) => {

    const collection = await dbService.getCollection('userScaleUp');
    
    // Sort by _id in descending order to get the most recent document
    return await collection.findOne(
      { userEmail: email },
      { sort: { _id: -1 } } // Using _id to determine the most recent document
    );
  };

 

const getFilePathByScaleUpID = async (scaleUpID) => {
    try {


        const collection = await dbService.getCollection('userScaleUp');
        const id = new ObjectId(scaleUpID); // Convert scaleUpID to ObjectId
        const scaleUp = await collection.findOne({ _id: id });
        return scaleUp;
    } catch (error) {
        console.error('Error in getByScaleUpID:', error);
        throw error;
    }
};
const getByScaleUpID = async (scaleUpID) => {
    try {


        const collection = await dbService.getCollection('userScaleUp');
        const id = new ObjectId(scaleUpID); // Convert scaleUpID to ObjectId
        const scaleUp = await collection.findOne({ _id: id });
        return scaleUp;
    } catch (error) {
        console.error('Error in getByScaleUpID:', error);
        throw error;
    }
};

const getFileById = async (fileId) => {
    const collection = await dbService.getCollection('userScaleUp');
    const file = await collection.findOne({ _id: new ObjectId(fileId) });
    return file;
};



module.exports = {
    uploadScaleUp,
    getByEmail,
    getFileById,
    getFilePathByScaleUpID,
    getRecentByEmail,
    getByScaleUpID
};
