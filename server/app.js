// NPM Packages
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
// const {dialogflow, Image} = require('actions-on-google')

// Own Packages
const nutrition = require('./nutrition/nutrition')

const port = process.env.PORT || 3000;

var app = express();
// var dflow = dialogflow();

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

    console.log(req.body);
    
    var intent = req.body.queryResult.intent.displayName;
    var userQuery = req.body.queryResult.queryText;
    var defaultFulfillmentMessage = req.body.queryResult.fulfillmentMessages[0].text.text[0];

    if (intent == "Nutrition Information") {
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