const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const nutrition = require('./nutrition');
const account = require('./account');
const moment = require('moment');
const cayley = require('./../db/cayley');

var logFood = async (username, userQuery, defaultFulfillmentMessage) => {
    var doc = await account.getAccountInfo(username);

    user_food_log_food_name = doc["food_log"]["food_name"];
    user_food_log_calories = doc["food_log"]["calories"];
    user_food_log_total_fat = doc["food_log"]["total_fat"];
    user_food_log_cholesterol = doc["food_log"]["cholesterol"];
    user_food_log_sodium = doc["food_log"]["sodium"];
    user_food_log_potassium = doc["food_log"]["potassium"];
    user_food_log_total_carbohydrate = doc["food_log"]["total_carbohydrates"];
    user_food_log_fibre = doc["food_log"]["fibre"];
    user_food_log_sugar = doc["food_log"]["sugar"];
    user_food_log_protein = doc["food_log"]["protein"];
    user_food_log_consumed_at = doc["food_log"]["consumed_at"];
    user_food_log_photo = doc["food_log"]["photo"];

    nutrition.getNutrition(userQuery).then((res) => {
        food = res.food;
        food_sum = res.food_sum

        for (i = 0; i < food.length; i++) {
            user_food_log_food_name.push(`${food[i].serving_qty} ${food[i].serving_unit} of ${food[i].food_name}`);
            user_food_log_calories.push(food[i].calories);
            user_food_log_total_fat.push(food[i].total_fat);
            user_food_log_cholesterol.push(food[i].cholesterol);
            user_food_log_sodium.push(food[i].sodium);
            user_food_log_potassium.push(food[i].potassium);
            user_food_log_total_carbohydrate.push(food[i].total_carbohydrates);
            user_food_log_fibre.push(food[i].fibre);
            user_food_log_sugar.push(food[i].sugar);
            user_food_log_protein.push(food[i].protein);
            user_food_log_consumed_at.push(food[i]["consumed_at"]);
            user_food_log_photo.push(food[i].photo);
        }

        User.findOneAndUpdate({
            name: username
        }, {
            $set: {
                "food_log.food_name": user_food_log_food_name,
                "food_log.calories": user_food_log_calories,
                "food_log.total_fat": user_food_log_total_fat,
                "food_log.cholesterol": user_food_log_cholesterol,
                "food_log.sodium": user_food_log_sodium,
                "food_log.potassium": user_food_log_potassium,
                "food_log.total_carbohydrate": user_food_log_total_carbohydrate,
                "food_log.fibre": user_food_log_fibre,
                "food_log.sugar": user_food_log_sugar,
                "food_log.protein": user_food_log_protein,
                "food_log.consumed_at": user_food_log_consumed_at,
                "food_log.photo": user_food_log_photo
            }
        }).then((doc) => {
                console.log("Food pushed!");
                
        }).catch((err) => {
            console.log(err);
        })

        return cayley.writeUserInfo(username)

    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })

    return ({
        "payload": {
            "google": {
                "expectUserResponse": true,
                "richResponse": {
                    "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": defaultFulfillmentMessage
                        }
                    }]
                }
            }
        }
    });
}

var getFoodLog = (name, defaultFulfillmentMessage) => {
    return new Promise((resolve, reject) => {
        var default_daily_calories = 2000;

        User.findOne({name}).then((doc) => {
            var food_log = doc.food_log;
            var food_sum = {
                sum_food_name: "",
                sum_calories: 0,
                sum_total_fat: 0,
                sum_cholesterol: 0,
                sum_sodium: 0,
                sum_potassium: 0,
                sum_total_carbohydrates: 0,
                sum_fibre: 0,
                sum_sugar: 0,
                sum_protein: 0,
            }

            for (i = 0; i < food_log.food_name.length; i++) {
                if (moment(food_log.consumed_at[i]).format('MM-DD-YYYY') == moment().format('MM-DD-YYYY')) {
                    food_sum.sum_food_name += `${food_log.food_name[i]}\n`
                    food_sum.sum_calories += food_log.calories[i],
                    food_sum.sum_total_fat += food_log.total_fat[i],
                    food_sum.sum_cholesterol += food_log.cholesterol[i], 
                    food_sum.sum_sodium += food_log.sodium[i], 
                    food_sum.sum_potassium += food_log.potassium[i], 
                    food_sum.sum_total_carbohydrates += food_log.total_carbohydrates[i], 
                    food_sum.sum_fibre += food_log.fibre[i], 
                    food_sum.sum_sugar += food_log.sugar[i], 
                    food_sum.sum_protein += food_log.protein[i]
                }
            }

            var nutrition_description = `Calories: ${food_sum.sum_calories.toFixed()}  \nTotal Fat: ${food_sum.sum_total_fat.toFixed(1)}g  \nCholesterol: ${food_sum.sum_cholesterol.toFixed(1)}mg  \nSodium: ${food_sum.sum_sodium.toFixed()}mg  \nPotassium: ${food_sum.sum_potassium.toFixed()}mg  \nTotal Carbohydrates: ${food_sum.sum_total_carbohydrates.toFixed()}g  \nDietary Fiber: ${food_sum.sum_fibre.toFixed(1)}g  \nSugars: ${food_sum.sum_sugar.toFixed(1)}g  \nProtein: ${food_sum.sum_protein.toFixed(1)}g`;
            var calories_advices = [`Based on FDA recommended 2000 calories per day, you have ${default_daily_calories - food_sum.sum_calories} calories remaining.`, `It looks like you've exceeded the FDA recommended 2000 calories per day limit. Do control your calories intake for the day.`];
            var calories_advice;

            if (food_sum.sum_calories <= default_daily_calories) {
                calories_advice = calories_advices[0]
            } else {
                calories_advice = calories_advices[1]
            }

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
                                    "title": "Daily Food Summary",
                                    "subtitle": food_sum.sum_food_name.trim(),
                                    "formattedText": nutrition_description,
                                    "image": {
                                        "url": food_log.photo[0],
                                        "accessibilityText": food_sum.sum_food_name
                                    }
                                }
                            },
                            {
                                "simpleResponse": {
                                    "textToSpeech": calories_advice
                                }
                            }
                            ]
                        }
                    }
                }
            });
        }).catch((err) => {
            console.log(err);
        })
    });
}

module.exports = {logFood, getFoodLog};