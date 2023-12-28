// userFiles.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
// const uploadsDir = path.join(__dirname, 'api', 'userFiles', 'uploads');
// const upload = multer({ dest: uploadsDir });
const upload = multer({ dest: 'api/userFiles/uploads' }); 

const { uploadFiles, getByEmail, downloadFile, storeFeedback } = require('./userFiles.controller');
const router = express.Router();

router.post('/feedback', storeFeedback);
router.post('/upload', upload.array('files'), uploadFiles);
router.get('/by-email/:email', getByEmail);
router.get('/download/:fileId', downloadFile);


module.exports = router;