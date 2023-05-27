import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";
import chunkArray from "./chunkArray.js";

/**
 * Uploads the given string array of jokes to the dynamoDB table provided.
 * NOTE: this relies totally upon the default AWS Credentials stored for this user.
 * @param {string[]} jokeList
 * @param {string} tableName
 * @returns {object} response
 */
const batchUploadJokesToDynamoDB = async (jokeList, tableName) => {
  const config = {};
  const client = new DynamoDBClient(config);
  const chunkSize = 25;

  const chunkedList = chunkArray(jokeList, chunkSize);
  let responseList = [];

  const chunkUploads = chunkedList.map(async (chunk, chunkCount) => {
    const putRequests = chunk.map((joke, i) => ({
      PutRequest: {
        Item: {
          Id: { N: `${i + 1 + chunkCount * chunkSize}` },
          Joke: { S: joke },
        },
      },
    }));

    const command = new BatchWriteItemCommand({
      RequestItems: {
        [tableName]: putRequests,
      },
    });

    const response = await client.send(command);
    responseList.push(response);
    return response;
  });

  await Promise.all(chunkUploads);

  return responseList;
};

export default batchUploadJokesToDynamoDB;
