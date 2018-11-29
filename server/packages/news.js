const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a92cb68334974232b4f987644734a5a2');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

var getArticles = (userQuery, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        newsapi.v2.everything({
            q: userQuery,
            from: '2018-11-01',
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
                                "basicCard": {
                                    "title": res.articles[0].title,
                                    "subtitle": `Source from ${res.articles[4].source.name}`,
                                    "formattedText": res.articles[0].description,
                                    "image": {
                                        "url": res.articles[0].urlToImage,
                                        "accessibilityText": res.articles[0].title
                                    }
                                }
                            },
                            {
                                "simpleResponse": {
                                    "textToSpeech": `It reads ${res.articles[0].description}`
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