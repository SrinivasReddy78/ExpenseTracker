const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true,
        maxLength : 50,
    },
    amount : {
        type : Number,
        required : true,
        min: 0,
        max : 100000000,
    },
    date : {
        type : Date,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim: true
    },
    description : {
        type : String,
        required : true,
        trim : true,
        maxLength : 250,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
}, {timestamps : true})



module.exports = mongoose.model('expense', expenseSchema)