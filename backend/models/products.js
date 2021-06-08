const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    description: { type: String, required: true},
    naam: { type: String, required: false },
    imagePath: { type: String, required: false},
    price: { type: Number, required: true}

});

module.exports = mongoose.model('Product', productsSchema);

