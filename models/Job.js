const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;


const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageId : [{
        type : ObjectId,
        ref : 'Image'
    }],
    categoryId :{
        type : ObjectId,
        ref : 'Category'
    },
    company : {
        type : String,
        required : true
    },
    place : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        
    },
    kualifikasi : {
        type : String,
    },
    tanggungJawab : {
        type : String,
       
    },
    lamarId : [{
        type : ObjectId,
        ref : 'Lamar'
    }]
})

module.exports = mongoose.model('Job', jobSchema)