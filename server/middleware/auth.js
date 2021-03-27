const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        if(!req.headers.authorization) return res.json({"message":"Authorized"})
        const token = req.headers.authorization.split(" ")[1];
        isCustomAuth = token.length < 500;   //to check whether auth is from google or custom auth 

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData.id;
        } else {
            //google auth
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
            req.isGoogleSignin = true;
            req.email = decodedData.email;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;