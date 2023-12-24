// userFiles.routes.js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const { uploadFiles } = require('./userFiles.controller');
const router = express.Router();

router.post('/upload', upload.array('files'), uploadFiles);

module.exports = router;