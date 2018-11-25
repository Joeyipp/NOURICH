// NPM Packages
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

// Own Packages
const nutrition = require('./nutrition/nutrition')

const port = process.env.PORT || 3000;

var app = express();

// Import and Setup Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
  });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
      });
});

// Webhook
app.post('/webhook', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "application/json");

    var intent = req.body.queryResult.intent.displayName;
    var userQuery = req.body.queryResult.queryText;
    var defaultFulfillmentMessage = req.body.queryResult.fulfillmentMessages[0].text.text[0];

    if (intent == "Default Welcome Intent") {
        var responseObj = {
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": defaultFulfillmentMessage
                            }
                        }
                        ],
                        "suggestions": [
                            {
                              "title": "Login"
                            },
                            {
                              "title": "Signup"
                            },
                            {
                                "title": "Continue as Guest"
                            }
                        ]
                    }
                }
            }
        }
        
        return res.json(responseObj)
    }

    else if (intent == "Nutrition Information") {
        console.log("Here is the post request from DialogFlow");
        console.log(userQuery);

        nutrition.getNutritionPayload(userQuery, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Import Google Packages
// const functions = require('firebase-functions');
// const {dialogflow, Image} = require('actions-on-google');

// var dflow = dialogflow();

// // Actions-On-Google
// dflow.intent('Default Welcome Intent', conv => {
//     conv.ask('Hi, how is it going?')
//     conv.ask(`Here's a picture of a cat`)
//     conv.ask(new Image({
//     url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
//     alt: 'A cat',
//     }))
// })

// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dflow)