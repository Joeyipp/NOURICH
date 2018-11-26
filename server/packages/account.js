const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');

var getAccountStatus = (name, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        User.findOne({name}).then((doc) => {
            if (!doc) {
                resolve({
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
                                ]
                            }
                        }
                    }
                })
            }
            else {
                resolve({
                    "payload": {
                        "google": {
                            "expectUserResponse": true,
                            "richResponse": {
                                "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": `Welcome back ${doc["name"]}! How can I help you?`
                                    }
                                }
                                ],
                                "suggestions": [
                                    {
                                        "title": "Account Info"
                                    },
                                    {
                                        "title": "Suggest Me Food"
                                    },
                                    {
                                        "title": "Log My Food"
                                    },
                                    {
                                        "title": "My Food Diary"
                                    },
                                    {
                                        "title": "My Progression"
                                    },
                                    {
                                        "title": "Get Nutrition Info"
                                    },
                                    {
                                        "title": "Food Fact of the Day"
                                    },
                                    {
                                        "title": "Share My Progress"
                                    }
                                ]
                            }
                        }
                    }
                })
            }
        })
    });
}

var setAccountInfo = (name, age, height, weight, diet_plan, food_allergies, health_condition, defaultFulfillmentMessage) => {
    var userDetails = new User({
        "name": name,
        "age": age,
        "height": height,
        "weight": weight,
        "diet_plan": diet_plan,
        "food_allergies": food_allergies,
        "health_condition": health_condition
    })

    userDetails.save().then((doc) => {
        console.log("User details saved!");
    }, (e) => {
        console.log(e);
    });

    resolve({
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
                            "title": "Account Info"
                        },
                        {
                            "title": "Suggest Me Food"
                        },
                        {
                            "title": "Log My Food"
                        },
                        {
                            "title": "My Food Diary"
                        },
                        {
                            "title": "My Progression"
                        },
                        {
                            "title": "Get Nutrition Info"
                        },
                        {
                            "title": "Food Fact of the Day"
                        },
                        {
                            "title": "Share My Progress"
                        }
                    ]
                }
            }
        }
    });
}


module.exports = {getAccountStatus, setAccountInfo};