const { ɵCodegenComponentFactoryResolver } = require('@angular/core');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const Product = require('./models/products');

const app = express();
mongoose.connect("mongodb+srv://ikse:iksealex@ikse.qwzff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('connected to db');
})
.catch(() => {
    console.log('Connection failed');
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.post('/api/products/new', (req, res, next) => {
    const product = new Product({
        naam: req.body.naam,
        description: req.body.description,
        imagePath: req.body.imagePath,
        price: req.body.price
    });
    product.save();
    console.log(product);
    res.status(201).json({ 
        message: 'Product succesvol toegevoegd'
    });
});

app.get('/api/products', (req, res, next) => {
    Product.find()
    .then(documents => {
        res.status(200).json({
            message: 'Producten succesvol gefetched',
            products: documents
        });
    });
});

app.delete('/api/products/delete/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: 'Product succesvol verwijderd',
        });
    });
});


app.use("/api/user", userRoutes);
module.exports = app;