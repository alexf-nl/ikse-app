const express = require("express");
const multer = require("multer");

const Product = require("../models/products");

const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");

        if(isValid) {
            error = null;
        }
        cb(error, "backend/images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    },
});


router.post('/new', multer({storage: storage}).single("imagePath"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
        naam: req.body.naam,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        price: req.body.price
    });
    product.save().then(createdProduct => {
        console.log(product);
        res.status(201).json({ 
            message: 'Product succesvol toegevoegd',
            product: {
                ...createdProduct,
                id: createdProduct._id
              }
        });
    });
    console.log(product);
});


router.get('', (req, res, next) => {
    Product.find()
    .then(documents => {
        res.status(200).json({
            message: 'Producten succesvol gefetched',
            products: documents
        });
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: 'Product succesvol verwijderd',
        });
    });
});


module.exports = router;