/**
 * Break a given array into an array of smaller length, defined by the chunkSize parameter.
 * @param {any[]} array
 * @param {number} chunkSize
 * @returns {any[]}
 */
const chunkArray = (array, chunkSize) => {
  const chunks = [];

  //Check that the chunkSize parameter has a value of greater than zero to prevent infinite loops.
  if (chunkSize > 0) {
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
  }
  return chunks;
};

export default chunkArray;
