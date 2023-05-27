import { readFileSync } from "node:fs";
import parseArgs from "./utils/parseArgs.js";
import validateFileExtension from "./utils/validateFileExtension.js";
import batchUploadJokesToDynamoDB from "./utils/batchUpload.js";

/**
 * Using a path provided as an argument, the txt document is then split into an array and loaded into DynamoDB.
 * This relies upon the user having default AWS credentials set in their CLI.
 *
 * NOTE:  If data already exists, it will be overwritten by what is provided in the text file!
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

    validateFileExtension(filepath, "txt");

    const file = readFileSync(filepath, "utf-8");

    const jokeList = file.split(/[\r\n]+/);

    batchUploadJokesToDynamoDB(jokeList, targetTable).then((response) => {
      console.log(response);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
