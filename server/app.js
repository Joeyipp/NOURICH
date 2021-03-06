// NPM Packages
const hbs = require('hbs');
const path = require('path');
const moment = require('moment');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

// Local Packages
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const welcome = require('./packages/welcome');
const nutrition = require('./packages/nutrition');
const account = require('./packages/account');
const utils = require('./packages/utils');
const foodFact = require('./packages/foodFact');
const food = require('./packages/food');
const menu = require('./packages/menu');
const progress = require('./packages/progress');
const news = require('./packages/news');
const cayley = require('./db/cayley');

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

// Initialize userDetails
var userDetails = {
    name: "",
    age: "",
    height: "",
    weight: "",
    diet_plan: "",
    food_allergies: "",
    health_condition: "" 
}

// Webhook
app.post('/webhook', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "application/json");

    var intent = req.body.queryResult.intent.displayName;
    var userQuery = req.body.queryResult.queryText;
    var defaultFulfillmentMessage = req.body.queryResult.fulfillmentMessages[0].text.text[0];

    if (intent == "Default Welcome Intent") {
        welcome.welcomePayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "User Signup Name") {
        userDetails.name = utils.toTitle(req.body.queryResult.parameters.name)

        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Age") {
        userDetails.age = req.body.queryResult.parameters.age.amount
        
        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Height") {
        userDetails.height = `${req.body.queryResult.parameters["unit-length"].amount} ${req.body.queryResult.parameters["unit-length"].unit}`; 
        
        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Weight") {
        userDetails.weight = `${req.body.queryResult.parameters["unit-weight"].amount} ${req.body.queryResult.parameters["unit-weight"].unit}`; 
        
        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Diet Plan") {
        userDetails.diet_plan = utils.toTitle(req.body.queryResult.parameters["Diet_plan"])
        
        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Food Allergies") {
        userDetails.food_allergies = utils.toTitle(req.body.queryResult.parameters["Food"])
        
        welcome.nextPayload(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (intent == "User Signup Health Condition") {
        userDetails.health_condition = utils.toTitle(req.body.queryResult.parameters["Health_Condition"])

        console.log(userDetails);

        account.setAccountInfo(userDetails, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })

        // setTimeout(() => {
        //     cayley.writeUserInfo(userDetails.name).then((doc) => {
        //         console.log(doc);
        //         console.log("User details saved to Cayley Graph")
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }, 2000)

    }

    else if (intent == "User Login") {
        userDetails.name = req.body.queryResult.parameters["name"];

        account.getAccountStatus(userDetails.name, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "Account Information") {

        account.getAccountInfo(userDetails.name).then((doc) => {
            userDetails.age = doc["age"];
            userDetails.height = doc["height"];
            userDetails.weight = doc["weight"];
            userDetails.diet_plan = doc["diet_plan"];
            userDetails.food_allergies = doc["food_allergies"];
            userDetails.health_condition = doc["health_condition"];

            return account.displayAccountInfo(userDetails, defaultFulfillmentMessage)

        }).then((responseObj) => {
            return res.json(responseObj)
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "User Menu") {
        menu.getMenuList(defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "Log My Food Followup") {
        food.logFood(userDetails.name, userQuery, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })

        // setTimeout(() => {
        //     cayley.writeUserInfo(userDetails.name).then((doc) => {
        //         console.log(doc);
        //         console.log("User foodlog saved to Cayley Graph")
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }, 2000)
    }

    else if (intent == "Food Diary") {
        food.getFoodLog(userDetails.name, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "User Progression") {
        var progression = req.body.queryResult.parameters["Progression"];
        var progression1 = req.body.queryResult.parameters["Progression1"];

        progress.getProgress(progression, progression1, defaultFulfillmentMessage).then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "User Suggestion") {
        account.getAccountInfo(userDetails.name).then((doc) => {
            userDetails.diet_plan = doc["diet_plan"];
            return news.getArticles(userDetails.diet_plan, defaultFulfillmentMessage);
        }).then((responseObj) => {
            return res.json(responseObj)
        }).catch((err) => {
            console.log(err);
        })
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

    else if (intent == "Food Fact") {
        foodFact.getRandomFoodFact().then((responseObj) => {
            return res.json(responseObj);
        }).catch((err) => {
            console.log(err);
        })
    }

    else if (intent == "Food Fact More") {
        foodFact.getRandomFoodFact().then((responseObj) => {
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