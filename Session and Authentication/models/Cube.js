const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxLength: 30
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
    difficulty: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        min: 1,
        max: 6
    },
    creatorId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }, 
    accessories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Accessory'
    }]
});

const Cube = mongoose.model('Cube', schema);

module.exports = Cube;