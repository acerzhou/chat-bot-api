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
    const userInfo = handleGetUserInfo();
    return userInfo;
  }

  if (httpMethod === "POST") {
    const requestBody = JSON.parse(event.body);

    console.log(requestBody);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ message: "POST request processed successfully" }),
    };

    return response;
  }
};

const handleGetUserInfo = () => {
  try {
    const body = {
      type: "userInfo",
      id: "123",
      name: "John Doe",
      phoneNumber: "0411111111",
      address: "test address, Melbourne, Vic, 3000",
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
