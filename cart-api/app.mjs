import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

export const lambdaHandler = async (event, context) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    const cart = handleGetCart();
    return cart;
  }

  if (httpMethod === "POST") {
    const updateCart = await handleCartUpdate(event);

    return updateCart;
  }
};

const handleCartUpdate = async (event) => {
  const item = {
    id: { N: "1" },
    body: { S: JSON.stringify(event.body) },
  };

  const params = {
    TableName: "CartTable",
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

const handleGetCart = async () => {
  const params = {
    TableName: "CartTable",
    Key: {
      id: "1",
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
      body: "Cart updated",
    };
  } catch (err) {
    console.error(err);
  }
};
