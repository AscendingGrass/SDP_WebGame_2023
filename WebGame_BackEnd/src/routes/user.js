const express = require("express");
const router = express();

const User = require("../models/Users");

router.post("/login", async (req, res)=>{
    const { username, password } = req.body;
    const result = await User.findOne({username});
    console.log(result);
    if(!result){
        return res.status(200).json({
            status: false,
            error: "User tidak terdaftar!"
        });
    }
    
    if(result.password != password){
        return res.status(200).json({
            status: false,
            error: "Password salah!"
        });
    }

    return res.status(200).json({
        status: true,
        result
    });
})

module.exports = router;