const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        minlength: 5,
        required: true,
        validate: [/^[A-Za-z0-9]+$/, 'The name consist only of English letters and digits'],
        password: { type: mongoose.SchemaTypes.String, required: true },
    }
});

const User = mongoose.model('User', schema);

module.exports = User;