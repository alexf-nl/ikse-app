const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    naam: { type: String, required: true },
    description: { type: String, required: true},
    imagePath: { type: String, required: true},
    price: { type: Number, required: true}

});

module.exports = mongoose.model('products', productsSchema);

