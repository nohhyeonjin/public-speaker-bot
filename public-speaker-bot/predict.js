//
// This quickstart shows how to predict the intent of an utterance by using the LUIS REST APIs.
//
var requestPromise = require('request-promise');
var queryString = require('querystring');



// Analyze a string utterance.
getPrediction = async () => {
    //const fs = require('fs')
    //////////
    // Values to modify.
    const utf8 = require('utf8');
    const iconv = require("iconv-lite");
    // YOUR-APP-ID: The App ID GUID found on the www.luis.ai Application Settings page.
    const LUIS_appId = "93a58891-bd1a-48fd-b48d-88dd89ad84ae";

    // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
    const LUIS_predictionKey = "751041c1212641bfa0fc5ef2eb83202d";

    // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
    // For example, "https://westus.api.cognitive.microsoft.com/"
    const LUIS_endpoint = "https://mybook-luis.cognitiveservices.azure.com/";

    // The utterance you want to use.
    //response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    const utterance =iconv.decode ("���װ������� ������ ��� �־�?").toString();
    //////////

    // Create query string
    const queryParams = {
        "show-all-intents": true,
        "verbose": true,
        "query": utterance,
        "subscription-key": LUIS_predictionKey
    }

    // Create the URI for the REST call.
    const URI = `${LUIS_endpoint}luis/prediction/v3.0/apps/${LUIS_appId}/slots/production/predict?${queryString.stringify(queryParams)}`

    // Send the REST call.
    const response = await requestPromise(URI);

   // fs.writeFileSync('bookInformation.jason',response)
    // Display the response from the REST call.
    console.log(response);
}

// Pass an utterance to the sample LUIS app
getPrediction().then(() => console.log("done")).catch((err) => console.log(err));