const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
require('dotenv').config();
const path = require('path')


const DB = require('./config/dbConnection');
const userRouter = require('./routes/userRouter');
const incomeRouter = require('./routes/incomeRouter');
const expenseRouter = require('./routes/expenseRouter');
const cookieParser = require('cookie-parser');
const expressSesssion = require('express-session');
const cors = require('cors');
const {isLoggedIn} = require('./middlewares/isLoggedIn')


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSesssion({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie :{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure : true,
        sameSite : 'strict',
        path :'/'
    }
}))
app.use(cors({
    origin: ['http://localhost:5173' || process.env.FRONTEND_URL ],
    credentials: true,
}))





//routes
app.use('/user', userRouter)
app.use('/income', isLoggedIn, incomeRouter);
app.use('/expense', isLoggedIn, expenseRouter);




app.listen(PORT, () => {
    console.log('App is listening at Port:', PORT)
})