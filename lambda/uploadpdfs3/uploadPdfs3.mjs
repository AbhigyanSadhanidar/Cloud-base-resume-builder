import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "ap-south-1" });
const bucketName = "psf-store-s3";

export const handler = async (event) => {
  console.log("Lambda invoked");
  console.log("Event:", JSON.stringify(event));

  try {
    const { fileName, fileData } = JSON.parse(event.body);
    console.log("Parsed fileName:", fileName);

    if (!fileName || !fileData) {
      console.log("Missing fileName or fileData");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing fileName or fileData" }),
      };
    }

    const base64String = fileData.split(",")[1];
    const buffer = Buffer.from(base64String, "base64");

    const uploadParams = {
      Bucket: bucketName,
      Key: `resumes/${fileName}`,
      Body: buffer,
      ContentType: "application/pdf",
      ACL: "private",
    };

    console.log("Uploading to S3:", uploadParams.Key);

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${uploadParams.Key}`;

    console.log("Upload successful:", url);

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to upload PDF" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
