// userModel.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
// const uploadsDir = path.join(__dirname, 'api', 'userFiles', 'uploads');
// const upload = multer({ dest: uploadsDir });
const upload = multer({ dest: 'api/userFiles/uploads' }); 

const { uploadModel, getByEmail, downloadFile, storeFeedback,getModelFilePath } = require('./userModel.controller');
const router = express.Router();

router.post('/feedback', storeFeedback);
router.post('/upload', upload.array('files'), uploadModel);
router.get('/by-email/:email', getByEmail);
router.get('/download/:fileId', downloadFile);
router.get('/filepath/:modelName', getModelFilePath);


//test
module.exports = router;