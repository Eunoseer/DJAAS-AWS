export const handler = async (event) => {
  // TODO implement random dad joke logic to retrieve from DynamoDB.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      id: "asdf1234",
      joke: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    }),
  };
  return response;
};
