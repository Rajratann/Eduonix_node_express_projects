const express = require('express');
const User = require('../model/User.js');
const router = express.Router();

http://localhost:5000/api/user/register

router.post('/register', async(req,res) => {
    const {username, email, password,} = req.body;

    try{
        const user = new User({username, email, password,})
        await user.save();
        res.status(201).json({message : "User registerd successfully..."})
    }catch(error){
        res.status(400).json({message : "Error while registering user..."})
    }
})



router.post('/login', async(req,res) => {

    const {email , password} = req.body;

    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message : "Invalid Email..."})
        }

        if(user.password !== password){
            return res.status(401).json({message : "Invalid Password..."})
        }

        res.status(200).json({message : "Login Successfully..."})


    }catch(error){
        res.status(400).json({message : "Error While User login...",error})
    }

})

module.exports = router;