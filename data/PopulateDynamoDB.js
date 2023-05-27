import { readFileSync } from "node:fs";
import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";

/**
 * Parses a list of arguments received by this script.
 * Returns an empty array if no arguments are passed.
 * @returns string[]
 */
const parseArgs = () => {
  //Ignore positions 0 and 1 as they are the location of the node.js executable and the path to this script.
  return process.argv.slice(2);
};

/**
 * Validates the filepath parameter received by the script, throwing an error if it is not the expected .txt.
 * @param {string} filepath
 */
const validatePassedFile = (filepath) => {
  const filePathParts = filepath.split(/\./);
  const extensionPeriodIndex = filePathParts.length - 1;

  if (filePathParts.length === 1) {
    //handle the case that no extension is passed.
    throw new Error("NoFileExtensionError");
  } else if (
    filePathParts.length >= 2 &&
    filePathParts[extensionPeriodIndex] !== "txt"
  ) {
    //handle the case that an invalid extension is passed.
    throw new Error("InvalidFileExtensionError");
  }
};

const batchUploadJokesToDynamoDB = async (jokes, tableName) => {
  const config = {};
  const client = new DynamoDBClient(config);

  const putRequests = jokes.map((joke, i) => ({
    PutRequest: {
      Item: {
        Id: { N: `${i + 1}` },
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

  return response;
};

/**
 * Using a path provided as an argument, the txt document is then split into an array and loaded into DynamoDB.
 * This relies upon the user having default AWS credentials set in their CLI.
 *
 * NOTE: This assumes that the target table exists and is empty!
 *
 * Args:
 *  1: Filepath to joke .txt file
 *  2: Name of target DynamoDB table
 */
const main = async () => {
  try {
    const args = parseArgs();
    const filepath = args[0];
    const targetTable = args[1];

    validatePassedFile(filepath);

    const file = readFileSync(filepath, "utf-8");

    const jokeList = file.split(/[\r\n]+/);

    const response = await batchUploadJokesToDynamoDB(jokeList, targetTable);

    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

main();
