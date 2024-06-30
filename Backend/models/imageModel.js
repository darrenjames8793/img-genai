const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    query: {
        type: String,
        required: [true, 'Query is required']
    },
    userId: {
        type: String,
        required: [true, 'User Id is required'],
        default: 'default-user'
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const imageModel = mongoose.model('images', imageSchema)

module.exports = imageModel