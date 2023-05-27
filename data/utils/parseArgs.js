/**
 * Parses a list of arguments received by this script.
 * Returns an empty array if no arguments are passed.
 * @returns {string[]}
 */
const parseArgs = () => {
  //Ignore positions 0 and 1 as they are the location of the node.js executable and the path to this script.
  return process.argv.slice(2);
};

export default parseArgs;
