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
                        "image": {
                            "url": link,
                            "accessibilityText": "Weight Progress"
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
        var weight_link = "https://drive.google.com/file/d/1SmulVMzZpZOJiUo72YPo2w80eQwN5Kz0/view";
        var calorie_link = "https://drive.google.com/file/d/1-CGj3zrJFt05gRmZhy6_vqe7nLcxpZWW/view";

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
                                "image": {
                                    "url": weight_link,
                                    "accessibilityText": "Weight Progress"
                                }
                            },
                            {
                                "image": {
                                    "url": calorie_link,
                                    "accessibilityText": "Calorie Progress"
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