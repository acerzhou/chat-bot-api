import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

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
      body: `User name has been updated tol ${event.body.name}` `,
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
