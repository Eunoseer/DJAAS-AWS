/**
 * Validates the filepath parameter received by the script, throwing an error if it is not the expected extension.
 * @param {string} filepath
 */
const validateFileExtension = (filepath, expectedExtension) => {
  const filePathParts = filepath.split(/\./);
  const extensionPeriodIndex = filePathParts.length - 1;

  if (filePathParts.length === 1) {
    //handle the case that no extension is passed.
    throw new Error("NoFileExtensionError");
  } else if (
    filePathParts.length >= 2 &&
    filePathParts[extensionPeriodIndex] !== expectedExtension
  ) {
    //handle the case that an invalid extension is passed.
    throw new Error("InvalidFileExtensionError");
  }
};

export default validateFileExtension;
