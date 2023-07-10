const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email is invalid']
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
    last_log_in: {
        type: Date,
        required: false
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