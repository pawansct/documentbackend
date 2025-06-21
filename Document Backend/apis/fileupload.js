const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.B2_ENDPOINT),
  accessKeyId: process.env.B2_ACCESS_KEY_ID,
  secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
  region: 'us-east-005', // match your bucket region
  signatureVersion: 'v4',
});


const BUCKET = process.env.B2_BUCKET_NAME;

const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, buffer } = req.file;
  const fileName = `${Date.now()}-${originalname}`;

  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };

try {
  const result = await s3.upload(params).promise();
  const response = {
    message: 'File uploaded successfully',
    fileUrl: result, 
  };
  console.log('File upload Success response:', response);
  res.status(200).json(response);
} catch (error) {
  console.error('File Upload Error:', error);
  const errorResponse = {
    error: 'Failed to upload file',
    details: error.message
  };
  console.log('Error in file upload:', errorResponse);
  res.status(500).json(errorResponse);
}
};

module.exports = handleFileUpload