const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const nutrition = require('./nutrition');
const account = require('./account');

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
    }).catch((err) => {
        console.log(err);
    })

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
                    }]
                }
            }
        }
    });
}

module.exports.logFood = logFood;