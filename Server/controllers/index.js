import bcrypt from 'bcrypt';
import pool from '../db.js';
import { sendCookie } from "../utils/index.js"



export const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        const checkuser = await pool.query("SELECT * FROM voter WHERE email = $1", [email]);
        if (checkuser.rows.length == 0) {
            return res.status(400).json({ success: false, message: "SignUp Please" });
        }
        const isMatched = await bcrypt.compare(password, checkuser.rows[0].password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        const user = checkuser.rows[0];

        sendCookie(user, res, `Welcome back, ${user.username}`, 200);

    } catch (error) {
        console.log(error);


    }
}

export const userSignUp = async (req, res) => {
    try {
        const { username, password, email, role_id } = req.body;
        const checkuser = await pool.query("SELECT * FROM voter WHERE email = $1", [email]);
        if (checkuser.rows.length > 0) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }
        const hashPassword = await bcrypt.hash(password, 15);
        const item = await pool.query(
            "INSERT INTO voter (username, email, role_id, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, role_id, hashPassword]
        );
        const user = item.rows[0];
        sendCookie(user, res, `Welcome ${user.username}`, 200);

    } catch (error) {
        console.log(error);
    }

}
export const userLogout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Develpoment" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });
};