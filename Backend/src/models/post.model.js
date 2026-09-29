const { urlencoded } = require('express')
const mongoose = require('mongoose')

const postScheme = new mongoose.Schema({
    image: String,
    caption: String,
})

const postModel = mongoose.model("post", postScheme)

module.exports = postModel