const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a92cb68334974232b4f987644734a5a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

var getArticles = (userQuery, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        newsapi.v2.everything({
            q: userQuery,
            from: '2018-10-28',
            to: '2018-11-25',
            language: 'en'
          }).then((res) => {
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
                                            "title": res.articles[0].title,
                                            "description": res.articles[0].description,
                                            "footer": `Source from ${res.articles[0].source.name}`,
                                            "image": {
                                                "url": res.articles[0].urlToImage,
                                                "accessibilityText": res.articles[0].title
                                            },
                                            "openUrlAction": {
                                                "url": res.articles[0].url
                                            }
                                        },
                                        {
                                            "title": res.articles[1].title,
                                            "description": res.articles[1].description,
                                            "footer": `Source from ${res.articles[1].source.name}`,
                                            "image": {
                                                "url": res.articles[1].urlToImage,
                                                "accessibilityText": res.articles[1].title
                                            },
                                            "openUrlAction": {
                                                "url": res.articles[1].url
                                            }
                                        },
                                        {
                                            "title": res.articles[2].title,
                                            "description": res.articles[2].description,
                                            "footer": `Source from ${res.articles[2].source.name}`,
                                            "image": {
                                                "url": res.articles[2].urlToImage,
                                                "accessibilityText": res.articles[2].title
                                            },
                                            "openUrlAction": {
                                                "url": res.articles[2].url
                                            }
                                        },
                                        {
                                            "title": res.articles[3].title,
                                            "description": res.articles[3].description,
                                            "footer": `Source from ${res.articles[3].source.name}`,
                                            "image": {
                                                "url": res.articles[3].urlToImage,
                                                "accessibilityText": res.articles[3].title
                                            },
                                            "openUrlAction": {
                                                "url": res.articles[3].url
                                            }
                                        },
                                        {
                                            "title": res.articles[4].title,
                                            "description": res.articles[4].description,
                                            "footer": `Source from ${res.articles[4].source.name}`,
                                            "image": {
                                                "url": res.articles[4].urlToImage,
                                                "accessibilityText": res.articles[4].title
                                            },
                                            "openUrlAction": {
                                                "url": res.articles[4].url
                                            }
                                        }
                                    ]
                                    
                                }
                            },
                            {
                                "simpleResponse": {
                                    "textToSpeech": `The first one reads ${res.articles[0].description}`
                                }
                            }
                            ]
                        }
                    }
                }
            })
          }).catch((err) => {
              console.log(err);
          });
    });
}

module.exports.getArticles = getArticles;

// newsapi.v2.everything({
//     q: "Indian curry",
//     from: '2018-10-28',
//     to: '2018-11-25',
//     language: 'en'
//   }).then((res) => {
//       for (var i = 0; i < 5; i++) {
//           console.log(res.articles[i].title)
//       }
// })