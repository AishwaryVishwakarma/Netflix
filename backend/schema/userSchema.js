const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    account_created_on:{
        type: Date,
        required: true,
        default: Date.now
    },
    subscription:{
        type:{
            type: String,
            required: false
        },
        value:{
            type: String,
            required: false
        }
    }
}) 


userModel = mongoose.model('users', userSchema)
module.exports = userModel