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
  try {
    const products = {
      type: "product",
      items: [
        {
          id: "1",
          sku: "609877",
          name: "The Legend of Zelda:Tears of the Kingdom",
          description: "The most popular game",
          brand: "Nintedo Switch",
          price: 74.0,
          image: "/images/zelda.webp",
        },
        {
          id: "2",
          sku: "294330",
          name: "Born To Die (Vinyl)",
          description: "A good vinyl",
          brand: "lana del rey",
          price: 61.99,
          image: "/images/born-to-die.webp",
        },
        {
          id: "3",
          sku: "348343",
          name: " Apple Pencil (2nd Gen)",
          description: "Apple Pen",
          brand: "Apple",
          price: 158,
          image: "/images/apple-pen.webp",
        },
      ],
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
