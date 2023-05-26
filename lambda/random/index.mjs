import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBTableName = process.env.DYNAMO_TABLE_NAME;
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  let headers = {
    "Content-Type": "application/json",
  };

  // TODO perform a count operation on the table to determine the maximum number to use for random generation dynamically.
  const dynamoDBJokeCount = 10;

  const randInt = generateRandomIntBelowMax(dynamoDBJokeCount);

  try {
    body = await dynamo.send(
      new GetCommand({
        TableName: dynamoDBTableName,
        Key: {
          Id: randInt,
        },
      })
    );
  } catch (err) {
    // Note: This is not returning the err.message as this could be a potential security flaw.
    statusCode = 500;
    body = "An internal server error occurred.";
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

// TODO move this into an application layer as it might be useful for other lambdas down the track.
const generateRandomIntBelowMax = (max, min = 1) => {
  return Math.round(Math.random() * (max - min) + min);
};
