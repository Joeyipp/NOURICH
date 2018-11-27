var getProgressPayload = (text, link, defaultFulfillmentMessage) => {
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
                                "accessibilityText": link
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

        if (progression == "Weight" || progression1 == "Weight") {
            resolve (getProgressPayload("Weight Progress", weight_link, defaultFulfillmentMessage));
        } 
        else if (progression == "Calories" || progression1 == "Calories") {
            resolve (getProgressPayload("Calories Progress", calorie_link, defaultFulfillmentMessage));
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
                                "carouselBrowse": {
                                    "items": [
                                        {
                                            "title": "Weight Progress",
                                            "image": {
                                                "url": weight_link,
                                                "accessibilityText": "Weight Progress"
                                            },
                                            "openUrlAction": {
                                                "url": weight_link
                                            }
                                        },
                                        {
                                            "title": "Calories Progress",
                                            "image": {
                                                "url": calorie_link,
                                                "accessibilityText": "Calorie Progress"
                                            },
                                            "openUrlAction": {
                                                "url": calorie_link
                                            }
                                        }
                                    ]
                                    
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