import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60000000),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message,
        });
};