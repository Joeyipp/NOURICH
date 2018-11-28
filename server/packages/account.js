const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const utils = require('./utils');

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
                                        "title": "Suggest Me"
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

var setAccountInfo = (userDetails, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        var user = new User(userDetails)
    
        user.save().then((doc) => {
            console.log("User details saved!");

            cayley.writeUserInfo(userDetails.name).then((doc) => {
                console.log(doc);
                console.log("User details saved to Cayley Graph")
            }).catch((err) => {
                console.log(err)
            })
            
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
                                "title": "Suggest Me"
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
    });
}

var getAccountInfo = (name) => {
    return new Promise((resolve, reject) => {
        User.findOne({name}).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            console.log(err);
        })
    });
}

var displayAccountInfo = (userDetails, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {

        var profile = `Age: ${userDetails.age}  \nHeight: ${userDetails.height}  \nWeight: ${userDetails.weight}  \nDiet Plan: ${utils.toTitle(userDetails.diet_plan)}  \nFood Allergies: ${utils.toTitle(userDetails.food_allergies)}  \nHealth Condtion: ${utils.toTitle(userDetails.health_condition)}`

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
                        },
                        {
                            "basicCard": {
                                "title": userDetails.name,
                                "formattedText": profile
                            }
                        }
                        ]
                    }
                }
            }
        });
    });
}

module.exports = {getAccountStatus, setAccountInfo, getAccountInfo, displayAccountInfo};