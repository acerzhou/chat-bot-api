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

import AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB();

export const lambdaHandler = async (event, context) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    const cart = handleGetCart();
    return cart;
  }

  if (httpMethod === "POST") {
    const updateCart = handleCartUpdate(event);

    return updateCart;
  }
};

const handleCartUpdate = (event) => {
  const item = {
    id: { N: "1" },
    name: { S: "John Doe" },
    age: { N: "30" },
  };

  const params = {
    TableName: "CartTable",
    Item: item,
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.error("Error saving item into DynamoDB", err);
    } else {
      console.log("Item saved successfully");
    }
  });
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
