const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
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
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;