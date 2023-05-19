/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event, context) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    const userInfo = await handleGetUserInfo();
    return userInfo;
  }

  if (httpMethod === "POST") {
    const userInfoUpdate = await handleUpdateUserInfo(event);

    return userInfoUpdate;
  }
};

const handleUpdateUserInfo = async (event) => {
  const item = {
    id: { N: "1" },
    body: { S: event.body },
  };

  const params = {
    TableName: "UserTable",
    Item: item,
  };

  const dbClient = new DynamoDBClient({
    region: "ap-southeast-2",
  });
  const command = new PutItemCommand(params);

  try {
    const results = await dbClient.send(command);
    console.log(results);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: "Cart updated",
    };
  } catch (err) {
    console.error(err);
  }
};

const handleGetUserInfo = async () => {
  const params = {
    TableName: "UserTable",
    Key: {
      id: { N: "1" },
    },
  };

  const dbClient = new DynamoDBClient({
    region: "ap-southeast-2",
  });
  const command = new GetItemCommand(params);

  try {
    const results = await dbClient.send(command);
    console.log(results);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: results.Item.body.S,
    };
  } catch (err) {
    console.error(err);
  }
};
