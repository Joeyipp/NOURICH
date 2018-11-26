const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const fs = require('fs'); 

var getAccountStatus = (name) => {
    return new Promise((resolve, reject) => {
        User.findOne({name}).then((doc) => {
            console.log(doc)
            resolve(doc)
        }).catch((err) => {
            console.log(err)
        })
    })
}

getAccountStatus("SoonJye").then((doc) => {
    fs.writeFileSync('results.json', JSON.stringify(doc))
}).catch((err) => {
    console.log(err)
})