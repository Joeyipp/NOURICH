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
    console.log("Here is the post request from DialogFlow");

    // console.log(req.body);
    var intent = req.body.queryResult.intent.displayName;

    if (intent == "Nutrition Information") {
        var userQuery = req.body.queryResult.queryText
        console.log(userQuery);
        var defaultFulfillmentMessage = req.body.queryResult.fulfillmentMessages;
        
        console.log(defaultFulfillmentMessage)

        var getResponseObj = async (userQuery) => {
            const foodInfo = await nutrition.getNutrition(userQuery);
            const food = foodInfo.food;
            const food_sum = foodInfo.food_sum;
            nutrition_description = `Amount Per Serving\nCalories: ${food_sum.sum_calories.toFixed()}\nTotal Fat: ${food_sum.sum_total_fat.toFixed(1)}g\nCholesterol: ${food_sum.sum_cholesterol.toFixed(1)}mg\nSodium: ${food_sum.sum_sodium.toFixed()}mg\nPotassium: ${food_sum.sum_potassium.toFixed()}mg\nTotal Carbohydrates: ${food_sum.sum_total_carbohydrates.toFixed()}g\n  Dietary Fiber: ${food_sum.sum_fibre.toFixed(1)}g\n  Sugars: ${food_sum.sum_sugar.toFixed(1)}g\nProtein: ${food_sum.sum_protein.toFixed(1)}g`;
            
            return responseObj = {
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "test"
                                }
                            },
                            {
                                "basicCard": {
                                    "title": "Nutrition Facts",
                                    "subtitle": "test",
                                    "formattedText": "test",
                                    "image": {
                                        "imageUri": "test",
                                        "accessibilityText": "sample text"
                                    }
                                }
                            }
                            ]
                        }
                    }
                }
            }          
        }

        getResponseObj(userQuery).then((responseObj) => {
            console.log(JSON.stringify(responseObj, undefined, 2))
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});