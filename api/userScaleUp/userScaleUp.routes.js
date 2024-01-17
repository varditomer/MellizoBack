// userScaleUp.routes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
// const uploadsDir = path.join(__dirname, 'api', 'userFiles', 'uploads');
// const upload = multer({ dest: uploadsDir });
const upload = multer({ dest: 'api/userFiles/multerTemp/uploads' }); 

const { uploadScaleUp, getByEmail, downloadFile,getScaleUpFilePath, getByScaleUpName } = require('./userScaleUp.controller');
const router = express.Router();

router.post('/upload', upload.fields([{ name: 'ourFiles' }, { name: 'otrFiles' }]), uploadScaleUp);
router.get('/by-email/:email', getByEmail);
// router.get('/download/:fileId', downloadFile);
router.get('/file-path/:scaleUpName', getScaleUpFilePath);
router.get('/getByScaleUpName/:scaleUpName', getByScaleUpName); // get details by su name

module.exports = router;