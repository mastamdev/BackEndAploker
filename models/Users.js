const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const usersSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    noHp : {
        type : String,
        required : true
    },
    jenisKelamin : {
        type : String,
        required : true
    },
    lamarId :[{
        type : ObjectId,
        ref : 'Lamar'
    }]
})

module.exports = mongoose.model('Users', usersSchema)