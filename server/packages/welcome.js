var welcomePayload = (defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
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
                                "title": "Login Existing Account"
                            },
                            {
                                "title": "Create New Account"
                            },
                            {
                                "title": "Continue As Guest"
                            }
                        ]
                    }
                }
            }
        })
    });
}

var nextPayload = (defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
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
    });
}

module.exports = {welcomePayload, nextPayload};