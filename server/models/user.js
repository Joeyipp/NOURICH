var {mongoose} = require('./../db/mongoose');

var User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    default: null
  },
  age: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  weight: {
    type: String,
    default: null
  },
  bmi: {
    type: String,
    default: null
  },
  diet_plan: {
    type: String,
    default: null
  },
  food_allergies: {
    type: String,
    default: null
  },
  food_preference: {
    type: String,
    default: null
  },
  health_condition: {
    type: String,
    default: null
  },
  food_log: {
      food_name: [{
          type: String
      }],
      calories: [{
          type: Number
      }],
      total_fat: [{
        type: Number
      }],
      cholesterol: [{
        type: Number
      }],
      sodium: [{
        type: Number
      }],
      potassium: [{
        type: Number
      }],
      total_carbohydrates: [{
        type: Number
      }],
      fibre: [{
        type: Number
      }],
      sugar: [{
        type: Number
      }],
      protein: [{
        type: Number
      }],
      consumed_at: [{
        type: String
      }],
      photo: [{
        type: String
      }]
  }
});

module.exports = {User};
