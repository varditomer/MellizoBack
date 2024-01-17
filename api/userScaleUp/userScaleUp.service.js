//userScaleUp.service:
const dbService = require('../../services/db.service');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;


const uploadScaleUp = async (files, userId, userEmail, scaleUpName, scaleUpDescription, bioreactorParams, cellParams) => {
    try {
        console.log("entered upload scaleup function -service")

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
    console.log("entered getByEmail of userScaleUp.service")
    const collection = await dbService.getCollection('userScaleUp');
    return await collection.find({ userEmail: email }).toArray();
};

const getByScaleUpName = async (scaleUpName) => {
    try {
        const collection = await dbService.getCollection('userScaleUp');
        const scaleUp = await collection.findOne({ scaleUpName: scaleUpName });
        return scaleUp;
    } catch (error) {
        console.error('Error in getByScaleUpName:', error);
        throw error;
    }
};

const getFileById = async (fileId) => {
    console.log("entered get file by id")
    const collection = await dbService.getCollection('userScaleUp');
    const file = await collection.findOne({ _id: new ObjectId(fileId) });
    return file;
};



module.exports = {
    uploadScaleUp,
    getByEmail,
    getFileById,
    getByScaleUpName
};
