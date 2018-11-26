var getMenuList = (defaultFulfillmentMessage) => {
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
    });
}

module.exports.getMenuList = getMenuList;