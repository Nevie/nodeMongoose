var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    description: String,
    title: String,
    author: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);