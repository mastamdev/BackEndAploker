const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    jobId : [{
        type : ObjectId,
        ref : 'Job'
    }]
})

module.exports = mongoose.model('Category', categorySchema)