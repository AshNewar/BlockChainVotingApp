import jwt from "jsonwebtoken";
import pool from '../db.js';

import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First",
        });

    const decodedemail = jwt.verify(token, process.env.JWT_SECRET);
    const checkuser = await pool.query("SELECT * FROM voter WHERE email = $1", [decodedemail.email]);
    req.user = checkuser.rows[0];
    next();
};
