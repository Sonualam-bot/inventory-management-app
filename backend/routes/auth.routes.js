const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User.model");
const {generateToken} = require("../utils/utils")



const {
    signup,
    login
} = require("../controllers/auth.controller")


authRouter.post("/register", async (req, res) => {
    try{
        const {firstName, lastName, email, password, profilePictureUrl, address} = req.body;

        const userExists = await User.findOne({email});

        if(userExists){
            res.json({
                success: false,
                message: "Username already exists."
            })
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // const profilePictureUrl = req.file ? req.file.path : null;

            const registerUser = await signup({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePictureUrl,
                address
            })

            const token = generateToken(registerUser._id);

            res.status(200).json({
                success: true,
                message: "Signup Successfull",
                user: registerUser,
                token: token
            })
        }
    }catch(error){
        throw new Error(error)
    }
})


authRouter.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(401).json({
                success: false,
                message: "Please Enter Email & Password"
            })
        }

        const userDetails = await login(email);

        if(!userDetails){
            res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        const matchPassword = await bcrypt.compare(password, userDetails.password);

        if(!matchPassword){
            res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = generateToken(userDetails._id);

        res.status(200).json({
            success: true,
            message: "Login Successfull",
            user: userDetails,
            token: token
        })

    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})



module.exports = authRouter;