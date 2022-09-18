const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
    // Bearer <token>.split("")[1];
    // ["Bearer", "<token>"]
        console.log(req.headers.authorization);
        if(req.headers.authorization != null){
        const token = req.headers.authorization.split('')[1];
        
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                return res.json({ message: err });
            }
            else {
                req.user = user;
                next();
            }
        })
    }else {
        return res.status(403).send({
            message: "not athorized",
            error: true,
        });
    }
};
module.exports = isAuthenticated;