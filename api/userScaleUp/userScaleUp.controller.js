// userScaleUp.controller.js
const userScaleUpService = require('./userScaleUp.service');

const uploadScaleUp = async (req, res) => {
    console.log("entered upload scale up -controller")

    try {
        const userId = req.body.userId;
        const userEmail = req.body.userEmail;
        const scaleUpName = req.body.scaleUpName;
        const description = req.body.scaleUpDescription;
        const bioreactorParams = JSON.parse(req.body.bioreactorParams);
        const cellParams = JSON.parse(req.body.cellParams);
        await userScaleUpService.uploadScaleUp(req.files, userId, userEmail, scaleUpName, description, bioreactorParams, cellParams);
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

const getScaleUpFilePath = async (req, res) => {
    try {
        const scaleUpName = req.params.scaleUpName;
        const scaleUp = await userScaleUpService.getByScaleUpName(scaleUpName);
        if (!scaleUp) {
            return res.status(404).send('scaleup not found');
        }
        res.json({ filePath: scaleUp.storagePath });
    } catch (error) {
        res.status(500).send('Error retrieving scaleup file path');
    }
};



const downloadFile = async (req, res) => {
    console.log("entered downloadFile in controller")
    try {
        const fileId = req.params.fileId;
        const file = await userScaleUpService.getFileById(fileId);

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




module.exports = {
    uploadScaleUp,
    getByEmail,
    downloadFile,
    getScaleUpFilePath
};
