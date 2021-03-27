const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    id: { type: String },
    news: {
        type: [String],
        default: [],
        required: true
    },
})

module.exports = mongoose.model('User', useSchema);