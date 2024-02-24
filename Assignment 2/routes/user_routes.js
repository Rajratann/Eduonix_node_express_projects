
const express = require('express');
const User = require('../models/user_model');;
const router = express.Router();

//POST -: http://localhost:5000/api/auth/signup
//BODY -> raw -> JSON -> 

// { "name": "Raju Narwade",
// "username":"rajuN",
// "email": "rajun@gmail.com",
// "password": "Rajn@358"
// }
router.post('/signup', async(req,res) => {
    const {name, username, email, password, } = req.body;

    try{
        const user = new User({name, email, username, password,})
        await user.save();
        res.status(201).json({message : "User registerd successfully..."})
    }catch(error){
        res.status(400).json({message : "Error while registering user..."})
    }
})


// POST -: http://localhost:5000/api/auth/login
// BODY -> row -> JSON
// { 
// "username":"rajuN",

// "password": "Rajn@358"
// }

router.post('/login', async(req,res) => {

    const {username , password} = req.body;

    try{
        const user = await User.findOne({username})

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