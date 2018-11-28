const account = require('./../packages/account');
const client = require('node-cayley')('116.203.24.85:64210', {
    promisify: true
});
const g = graph = client.g; // Or: const g = graph = client.graph;

var getUserInfo = (name) => {
    return new Promise((resolve, reject) => {
        account.getAccountInfo(name).then((doc) => {
            var user = Object.assign({}, doc._doc);
            user.primaryKey = `</user/name/${user.name}>`
            user.label = `${user.name}`;

            for (var i = 0; i < user.food_log.food_name.length; i++) {
                if (user.food_log.calories[i]) {
                    user.food_log.calories[i] = user.food_log.calories[i].toString();  
                }
            }

            delete user._id;
            delete user.__v;
            delete user.food_log.total_fat;
            delete user.food_log.cholesterol;
            delete user.food_log.sodium;
            delete user.food_log.potassium;
            delete user.food_log.total_carbohydrates;
            delete user.food_log.fibre;
            delete user.food_log.sugar;
            delete user.food_log.protein;
            delete user.food_log.photo;
            
            resolve(user);
        }).catch((err) => {
            reject(err);
        })
    });
}

var writeUserInfo = (name) => {
    return new Promise((resolve, reject) => {
        account.getAccountInfo(name).then((doc) => {
            var user = Object.assign({}, doc._doc);
            user.primaryKey = `</user/name/${user.name}>`
            user.label = `${user.name}`;

            for (var i = 0; i < user.food_log.food_name.length; i++) {
                if (user.food_log.calories[i]) {
                    user.food_log.calories[i] = user.food_log.calories[i].toString();  
                }
            }

            delete user._id;
            delete user.__v;
            delete user.food_log.total_fat;
            delete user.food_log.cholesterol;
            delete user.food_log.sodium;
            delete user.food_log.potassium;
            delete user.food_log.total_carbohydrates;
            delete user.food_log.fibre;
            delete user.food_log.sugar;
            delete user.food_log.protein;
            delete user.food_log.photo;
            
            resolve(user);

            return client.write([
                // primaryKey: user.primaryKey,
                // label: user.label,
                // name: user.name
                user
            ])
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            reject(err);
        })
    });
}

var deleteUserInfo = (userObj) => {
    return new Promise((resolve, reject) => {
        client.delete([
            userObj
        ]).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    });
}

//////////////////// EXAMPLE WRITE TRIPLES ////////////////////
// writeUserInfo("John").then((doc) => {
//     console.log(doc)
// }).catch((err) => {
//     console.log(err)
// })

//////////////////// EXAMPLE DELETE TRIPLES ////////////////////
// getUserInfo("John").then((doc) => {
//     console.log(doc)
//     return deleteUserInfo(doc)
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err)
// })

//////////////////// EXAMPLE QUERY ////////////////////
// g.V("</user/name/John>").Out("<food_name>", "predicate").All().then((res) => {
//     console.log(JSON.stringify(res, undefined, 2));
// }).catch((err) => {
//     console.log(err);
// })

module.exports = {getUserInfo, writeUserInfo, deleteUserInfo};