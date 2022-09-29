const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        min: 5, 
        max: 15
    },
    desc: {
        type: String,
        required: true,
        min: 5,
        max: 10
    }
},{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);