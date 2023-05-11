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
        sku: "609877",
        name: "The Legend of Zelda:Tears of the Kingdom",
        description: "The most popular game",
        brand: "Nintedo Switch",
        price: 74.0,
        image:
          "https://www.jbhifi.com.au/products/nintendo-switch-the-legend-of-zeldatears-of-the-kingdom?queryID=9332e3671fb1fba6cb64cc68cc30f11a&objectID=609877",
      },
      {
        id: "2",
        sku: "294330",
        name: "Born To Die (Vinyl)",
        description: "A good vinyl",
        brand: "lana del rey",
        price: 61.99,
        image:
          "https://www.jbhifi.com.au/products/vinyl-del-rey-lana-born-to-die-vinyl-2lp?queryID=18eeed8ec5067cabf934385eb8111f8c&objectID=294330",
      },
      {
        id: "3",
        sku: "348343",
        name: " Apple Pencil (2nd Gen)",
        description: "Apple Pen",
        brand: "Apple",
        price: 158,
        image: "https://www.jbhifi.com.au/products/apple-pencil-2nd-gen",
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
