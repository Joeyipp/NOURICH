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
                                "title": "Login"
                            },
                            {
                                "title": "Signup"
                            },
                            {
                                "title": "Continue as Guest"
                            }
                        ]
                    }
                }
            }
        })
    });
}

module.exports.welcomePayload = welcomePayload;