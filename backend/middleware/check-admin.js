const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secret_alexs1118551ikseAPI_heelErgBeveiligdVoorAssessment');
        next(); 
    } catch (error) {
        res.status(401).json({message: 'Authorizatie gefaald. Log opnieuw in'});
    }
};