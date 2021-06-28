const express = require("express");
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const ProductController = require("../controllers/products");
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



router.post('/new', checkAuth, multer({storage: storage}).single("imagePath"), ProductController.createProduct);
router.get("/:id", ProductController.getSingleProduct);
router.get('', ProductController.getAllProducts);
router.delete('/delete/:id', checkAuth, ProductController.deleteProduct);
router.put("/:id",multer({ storage: storage }).single("imagePath"), ProductController.updateProduct);
module.exports = router;