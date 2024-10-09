const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utlis/generateToken');
const {verifyToken} = require('../utlis/verifyToken');


const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'you already have an account, please login' });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            fullname,
            email,
            password: hashedPassword,
        });
        await user.save();
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'strict',
        });
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, fullname: user.fullname, email: user.email },
            expiresAt : Date.now() + 24*60*60*1000,
            token: token
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "you don't have an account,Please register" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15* 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            secure: true
        });
        res.status(200).json({ message: 'logged in successfully',  user: { id: user._id, fullname: user.fullname, email: user.email }, expiresAt : Date.now() + 15*24*60*60*1000 });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// const isAuthenticated = (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ authenticated: false, message: 'No token provided' });
//     }

//     try {
//         const verifiedUser = verifyToken(token);  
//         if (verifiedUser) {
//             return res.status(200).json({ authenticated: true, user: verifiedUser });
//         } else {
//             return res.status(401).json({ authenticated: false, message: 'Invalid token' });
//         }
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ authenticated: false, message: 'Token expired' });
//         }
//         return res.status(401).json({ authenticated: false, message: 'Token verification failed' });
//     }
// };


const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    });
    res.status(200).json({ message: 'Logout successful' });
}



module.exports = { registerUser, loginUser, logoutUser }