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

router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
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



router.put(
    "/:id",
    multer({ storage: storage }).single("imagePath"),
    (req, res, next) => {
      let imagePath = req.body.imagePath;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
      }
      const product = new Product({
        _id: req.body.id,
        naam: req.body.naam,
        description: req.body.description,
        imagePath: imagePath,
        price: req.body.price
      });
      console.log(product);
      Product.updateOne({ _id: req.params.id }, product).then(result => {
        res.status(200).json({ message: "Update successful!" });
      });
    }
  );


module.exports = router;