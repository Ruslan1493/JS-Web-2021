const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: mongoose.SchemaTypes.String, required: true },
    password: { type: mongoose.SchemaTypes.String, required: true },
});

const User = mongoose.model('User', schema);

module.exports = User;