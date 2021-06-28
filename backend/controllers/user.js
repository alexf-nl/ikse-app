const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'U bent succesvol geregistreerd',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                    message: "Email met dit wachtwoord bestaat al. Probeer in te loggen."
            });
        });
    });    
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Verkeerde email/wachtwoord. Probeer opnieuw.'
            });
        }

        fetchedUser = user; 
        return bcrypt.compare(req.body.password, user.password);    
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Verkeerde email/wachtwoord. Probeer opnieuw.'
            })
        }
        const token = jwt.sign(
            {email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role}, 
            process.env.JWT_KEY, 
            {expiresIn: '1h' }
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            role: fetchedUser.role
        })

    })
    .catch(err => {
        return res.status(401).json({
            message: 'Verkeerde email/wachtwoord. Probeer opnieuw.'
        });
    });
}
