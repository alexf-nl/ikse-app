const { iif } = require("rxjs");
const Product = require("../models/products");

exports.createProduct = (req, res, next) => {
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
    })
    .catch(error => {
      res.status(500).json({ 
        message: 'Een product toevoegen is gefaald. Probeer opnieuw en vul alle velden in!'
      })
    });
    console.log(product);
}

exports.getSingleProduct = (req, res, next) => {
    Product.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Product niet gevonden!" });
      }
    });
  }

exports.getAllProducts = (req, res, next) => {
    Product.find()
    .then(documents => {
        res.status(200).json({
            message: 'Producten succesvol gefetched',
            products: documents
        });
    }) .catch(error => {
      res.status(500).json({ 
        message: 'Producten konden niet worden geladen. Probeer opnieuw of neem contact op met de beheerder!'
      });
    });
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: 'Product succesvol verwijderd',
        });
    })
    .catch(error => {
        res.status(500).json({ 
            message: 'Product kon niet verwijderd worden. Probeer opnieuw of neem contact op met de beheerder.'
        });
    });
}

exports.updateProduct = (req, res, next) => {
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
    Product.updateOne({ _id: req.params.id }, product).then(result => {
        if(result.n > 0) {
            res.status(200).json({ message: "Product succcesvol gupdate!" });
        } else {
            res.status(401).json({ message: "U bent niet geauthorizeerd om deze actie uit te voeren. Neem contact op met de beheerder." });
        }
    }).catch(error => {
      res.status(500).json({ 
        message: 'Product updaten is gefaald. Vul alle velden in en probeer opnieuw!'
      });
    });
  }