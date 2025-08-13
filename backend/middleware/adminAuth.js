const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized: Token missing",
            });
        }

        const decoded = JWT.verify(token, process.env.SECRET_KEY);
            if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Token invalid for admin",
            });
        
    }

        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
