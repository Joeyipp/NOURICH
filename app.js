const hbs = require('hbs');
const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();

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

app.post('/webhook', function (req, res) {
    console.log("Received a post request");
    if (!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "application/json");
    console.log("Here is the post request from DialogFlow");
    console.log(req.body);
    
    let response = " ";
    let responseObj = {
        "fulfillmentText": response,
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "This is a test from webhook!"]
                }
            }],
        "source": "",
        "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "This is a simple response"
                    }
                  }
                ]
              }
            }
        }
    }

    // console.log("Here is the response to DialogFlow");
    // console.log(responseObj);
    return res.json(responseObj);
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});