const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxlength: 30
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: {
            validator: function (v) {
                var re = /(^http||^https)/;
                return (v == null || v.trim().length < 1) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        }
    },
    cubes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Cube'
    }]
});

const Accessory = mongoose.model('Accessory', schema);

module.exports = Accessory;