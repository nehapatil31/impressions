const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    news: {
        type: [String],
        default: []
    },
})

module.exports = mongoose.model('User', useSchema);