import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors";
import { userLogin, userLogout, userSignUp } from './controllers/index.js';
import { isAuthenticated } from './auth/auth.js';


const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.get("/", (req, res) => {
    res.cookie("Hello", "bchrbj").send("Hello")
})

app.post('/voter/signup', userSignUp)

app.get('/voter/profile', isAuthenticated, async (req, res) => {
    try {
        res.json(req.user);

    } catch (error) {
        console.log(error);


    }
})
app.get("/voter/logout", userLogout);


app.post('/voter/login', userLogin)


app.listen(5000, () => {
    console.log('Server on port 5000');
})
