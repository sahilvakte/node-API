const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expressValidator = require('express-validator')

// var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    name :{
        type : String
    },
    email :{
        type : String,
        required:[true,"Email already exists"],
        unique:true
    },
    phone :{
        type : String
    },
    password :{
        type : String
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)
module.exports = User;