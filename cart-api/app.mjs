import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

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
  console.log("event", JSON.stringify(event));
  const params = {
    TableName: "CartTable",
    Item: event.body,
  };

  const dbClient = new DynamoDBClient({
    region: "ap-southeast-2",
  });
  const command = new PutItemCommand(params);

  try {
    const results = await dbClient.send(command);
    console.log(results);
  } catch (err) {
    console.error(err);
  }
};

const handleGetCart = () => {
  try {
    const cart = {
      id: 1,
      type: "cart",
      items: [
        {
          id: 1,
          name: "The Legend of Zelda:Tears of the Kingdom",
          sku: "609877",
          price: 74.0,
          image: "/images/zelda.webp",
          quantity: 1,
        },
        {
          id: 2,
          name: "Born To Die (Vinyl)",
          sku: "294330",
          price: 61.99,
          image: "/images/born-to-die.webp",
          quantity: 2,
        },
      ],
      totalPrice: 0,
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
