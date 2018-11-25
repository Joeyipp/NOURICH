var request = require('request');

var getNutrition = (query) => {
    return new Promise((resolve, reject) => {

        var body = {
            query,
            "timezone": "US/Eastern"
        };
        
        var formData = JSON.stringify(body);
        
        request({
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': 'f12a37c9', 
              'x-app-key': '82239310ed1abf737330b95f9f2d85e7'
            },
            url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
            body: formData,
            method: 'POST'
          }, (err, res, body) => {
            if (err) {
                reject(`Error: ${err}`);
            }

            body = JSON.parse(body);
            var food = []
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

            for (i = 0; i < body.foods.length; i++) {
                food[i] = {
                    food_name: body.foods[i].food_name,
                    serving_unit: body.foods[i].serving_unit,
                    serving_qty: body.foods[i].serving_qty,
                    calories: body.foods[i].nf_calories,
                    total_fat: body.foods[i].nf_total_fat,
                    cholesterol: body.foods[i].nf_cholesterol,
                    sodium: body.foods[i].nf_sodium,
                    potassium: body.foods[i].nf_potassium,
                    total_carbohydrates: body.foods[i].nf_total_carbohydrate,
                    fibre: body.foods[i].nf_dietary_fiber,
                    sugar: body.foods[i].nf_sugars,
                    protein: body.foods[i].nf_protein,
                    consumed_at: body.foods[i].consumed_at,
                    photo: body.foods[i].photo.highres,
                    is_user_uploaded: body.foods[i].photo.is_user_uploaded
                }
            }
            
            for (i = 0; i < food.length; i++) {
                food_sum.sum_food_name += `${food[i].serving_qty} ${food[i].serving_unit} of ${food[i].food_name}\n`
                food_sum.sum_calories += food[i].calories,
                food_sum.sum_total_fat += food[i].total_fat,
                food_sum.sum_cholesterol += food[i].cholesterol, 
                food_sum.sum_sodium += food[i].sodium, 
                food_sum.sum_potassium += food[i].potassium, 
                food_sum.sum_total_carbohydrates += food[i].total_carbohydrates, 
                food_sum.sum_fibre += food[i].fibre, 
                food_sum.sum_sugar += food[i].sugar, 
                food_sum.sum_protein += food[i].protein
            }

            resolve({
                food,
                food_sum
            })
        });
    });
}

// // Sample request
// getNutrition("1 mashed potatoes 2 tbsp gravy").then((res) => {
//     console.log(res.food);
//     console.log(res.food_sum)
// }).catch((err) => {
//     console.log(err);
// })

module.exports.getNutrition = getNutrition;

