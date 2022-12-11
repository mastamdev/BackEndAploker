const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const lamarSchema = new mongoose.Schema({
    namaLengkap : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    nomorTelepon : {
        type : String,
        required : true
    },
    usersId : {
        type : ObjectId,
        ref : 'Users'
    },
    jobId : {
        type : ObjectId,
        ref : 'Job'
    }
})

module.exports = mongoose.model('Lamar', lamarSchema)