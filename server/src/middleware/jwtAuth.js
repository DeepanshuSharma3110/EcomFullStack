import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
   
    const authCookies = req.cookies['jwtKey']; 
    (authCookies);
    
    // Check if the cookie exists
    if (!authCookies) {        
        const err = { statusCode: 401, message: 'Please login first' };
        return next(err);
    }

    // Verify the JWT token
    jwt.verify(authCookies, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = { statusCode: 401, message: 'Invalid token' };
            return next(error); 
        }
        req.user = decoded; 
        next();
    });
};

export default jwtAuth;
