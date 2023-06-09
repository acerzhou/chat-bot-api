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
    const products = [
      {
        id: "1",
        sku: "",
        name: "",
        description: "",
        brand: "",
        price: "",
      },
      {
        id: "2",
        sku: "",
        name: "",
        description: "",
        brand: "",
        price: "",
      },
      {
        id: "1",
        sku: "",
        name: "",
        description: "",
        brand: "",
        price: "",
      },
    ];

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
