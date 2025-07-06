import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: "ap-south-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Lambda invoked");
  console.log("Event received:", JSON.stringify(event));

  // Handle preflight OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "CORS preflight success" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    console.log("Parsed body:", body);

    const { name, email, experience, education, skills, summary } = body;

    if (!name || !email) {
      console.warn("Missing required fields: name or email");
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "Name and email are required" }),
      };
    }

    const input = {
      TableName: "resumeData",
      Item: {
        id: uuidv4(),
        name,
        email,
        experience,
        education,
        skills,
        summary,
        createdAt: new Date().toISOString(),
      },
    };

    console.log("Writing to DynamoDB:", input);
    await docClient.send(new PutCommand(input));
    console.log("Data stored successfully");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Data stored successfully" }),
    };
  } catch (error) {
    console.error("Error storing data:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Failed to store data" }),
    };
  }
};