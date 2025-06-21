const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Multer middleware
const handleFileUpload  = require('../apis/fileupload');

router.post('/upload', upload.single('file'), handleFileUpload);

module.exports = router;
