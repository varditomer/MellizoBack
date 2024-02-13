// userScaleUp.controller.js
const userScaleUpService = require('./userScaleUp.service');

const uploadScaleUp = async (req, res) => {

    try {
        const {
            userId,
            userEmail,
            scaleUpName,
            aBug: scaleUpDescription,
        } = req.body;
        const bioreactorParams = JSON.parse(req.body.bioreactorParams);
        const cellParams = JSON.parse(req.body.cellParams);

        await userScaleUpService.uploadScaleUp(req.files, userId, userEmail, scaleUpName, scaleUpDescription, bioreactorParams, cellParams);
        res.status(200).send('scale up uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading scale up');
    }
};

const getByEmail = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const files = await userScaleUpService.getByEmail(userEmail);
        res.json(files);
    } catch (error) {
        res.status(500).send('Error retrieving files');
    }
};

const getByScaleUpID = async (req, res) => {
    try {
        const scaleUpID = req.params.scaleUpID;
        console.log(scaleUpID)
        const details = await userScaleUpService.getByScaleUpID(scaleUpID);
        res.json(details);
    } catch (error) {
        res.status(500).send('Error retrieving scaleup details');
    }
};

const getScaleUpFilePath = async (req, res) => {
    try {

        const scaleUpID = req.params.scaleUpID;
        const scaleUp = await userScaleUpService.getFilePathByScaleUpID(scaleUpID);
        if (!scaleUp) {
            return res.status(404).send('scaleup not found');
        }
        res.json({ ourStoragePath: scaleUp.ourStoragePath, otrStoragePath: scaleUp.otrStoragePath });
    } catch (error) {
        res.status(500).send('Error retrieving scaleup file path');
    }
};

const getRecentByEmail = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const recentScaleUp = await userScaleUpService.getRecentByEmail(userEmail);
        res.json(recentScaleUp);
    } catch (error) {
        res.status(500).send('Error retrieving recent Scale Up');
    }
  };



const downloadFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const file = await userScaleUpService.getFileById(fileId);

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
    uploadScaleUp,
    getByEmail,
    downloadFile,
    getScaleUpFilePath,
    getByScaleUpID,
    getRecentByEmail
};
