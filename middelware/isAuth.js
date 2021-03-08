const jwt = require('jsonwebtoken');
const jwtSecret = "secret_code";

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token is not vaild' });
    }
}