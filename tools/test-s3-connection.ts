const { S3Client, ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');

const REGION = String(process.env.AWS_REGION);
const ACCESS_KEY_ID = String(process.env.AWS_ACCESS_KEY_ID);
const SECRET_ACCESS_KEY = String(process.env.AWS_SECRET_ACCESS_KEY);

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function testS3Connection() {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    console.log("link S3 success");

    // print buckets log
    response.Buckets?.forEach((bucket) => {
      console.log(`has buckets: ${bucket.Name}`);
    });

    // await testFileUpload();
  } catch (error) {
    console.error("link S3 error:", error);
  }
}

async function testFileUpload() {
  try {
    // create test txt
    const testFileName = 'test-upload.txt';
    const testFilePath = path.join(__dirname, testFileName);
    fs.writeFileSync(testFilePath, 'This is a test file for S3 upload.');

    const fileContent = fs.readFileSync(testFilePath);
    const uploadParams = {
      Bucket: 'website-online',
      Key: testFileName,
      Body: fileContent,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadResponse = await s3Client.send(uploadCommand);
    console.log("upload success:", uploadResponse);

   fs.unlinkSync(testFilePath);
  } catch (error) {
    console.error("upload error:", error);
  }
}

testS3Connection();
