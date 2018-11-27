var getProgressPayload = (link) => {
    return {
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
                            "image": {
                                "url": link,
                                "accessibilityText": food_sum.sum_food_name
                            }
                        }
                    }
                    ]
                }
            }
        }
    }
}

var getProgress = (progression, progression1, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        // weight: https://ibb.co/rkB7Kyf
        // calorie: https://ibb.co/NNct9yR
    
        var weight_link = "https://i.ibb.co/31xr5hY/Weight.png";
        var calorie_link = "https://i.ibb.co/vd0V3j9/Calories.png";

        if (progression == "weight" || progression1 == "weight") {
            resolve (getProgressPayload(weight_link));
        } 
        else if (progression == "calories" || progression1 == "calories") {
            resolve (getProgressPayload(calorie_link));
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
                                    "textToSpeech": defaultFulfillmentMessage
                                }
                            },
                            {
                                "basicCard": {
                                    "image": {
                                        "url": weight_link,
                                        "accessibilityText": "Weight Progress"
                                    }
                                }
                            },
                            {
                                "basicCard": {
                                    "image": {
                                        "url": calorie_link,
                                        "accessibilityText": "Calorie Progress"
                                    }
                                }
                            }
                            ]
                        }
                    }
                }
            }
            )
        }
    });
}

module.exports.getProgress = getProgress;