const Scoreboard = require("../models/Scoreboards");
const User = require("../models/Users");
const jwt = require('jsonwebtoken');

const secret_key = "t12345!";

const user = async (req, res)=> {
    const { id } = req.params;

    const result = await User.findOne({
        _id: id
    });

    if(!result){
        return res.status(200).json({
            error: true,
            msg: "User tidak ditemukan"
        })
    }

    return res.status(200).json({
        error: false,
        msg: "User ditemukan",
        result
    })
};

const login = async (req, res)=>{
    const { username, password } = req.body;
    const result = await User.findOne({username});
    console.log(result);
    if(!result){
        return res.status(200).json({
            error: true,
            msg: "User tidak terdaftar!"
        });
    }
    
    if(result.password != password){
        return res.status(200).json({
            error: true,
            msg: "Password salah!"
        });
    }
    console.log(result);
    const access_token = jwt.sign({...result}, secret_key, {expiresIn: "3h"});
    return res.status(200).json({
        error: false,
        msg: "Berhasil login!",
        result,
        access_token
    });
}

const register = async (req, res)=>{
    const { username, password, gender, email } = req.body;

    const checkUsername = await User.findOne({
        username
    }); 

    if(checkUsername){
        return res.status(200).json({
            error: true,
            msg: "Username telah terpakai"
        })
    }

    const checkEmail = await User.findOne({
        email
    })

    if(checkEmail){
        return res.status(200).json({
            error: true,
            msg: "Email telah terpakai"
        })
    }

    // if(password != confirm_password){
    //     return res.status(200).json({
    //         error: true,
    //         msg: "Password tidak sama!"
    //     })
    // }

   
    const newUser = await User.create({
        username, password, gender, email,
        role: "user"
    });

    const scoreboard = await Scoreboard.create({
        user_id: newUser._id,
    })

    await User.findOneAndUpdate({
        _id: newUser._id
    }, {
        $set: {
            scoreboard: scoreboard._id
        }
    })

    const result = await User.findById(newUser._id)

    return res.status(200).json({
        error: false,
        msg: "Berhasil register",
        result
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    let checkUser = await User.findOne({
        _id: id
    });
    if(!result) return res.status(200).send({
        error: true,
        msg: "Tidak ada user dengan ID : " + id
    })
    
    checkUser.$set({
        status: "dead",
        deleted_at: Date.now()
    });

    const result = await checkUser.save();

    return res.status(200).json({
        error: false,
        msg: "Berhasil delete user dengan ID : " + id,
        result
    });
}

const allUser = async (req, res) => {
    const result = await User.find();
    
    console.log(result);
    return res.status(200).json({
        error: false,
        result
    })
}

const allUserStatus = async (req, res) => {
    const { status } = req.params;
    const result = await User.find({
        status
    });
    
    console.log(result);
    return res.status(200).json({
        error: false,
        result
    })
}

const fetchMale = async (req, res) => {
    const result = await User.aggregate([
        {
            $match: {
                gender: "male"
            }
        },
        {
            $lookup: {
                from: "scoreboards",
                localField: "scoreboard",
                foreignField: "_id",
                as: "scoreboard"
            }
        },
        {
            $unwind: "$scoreboard"
        },
        {
            $project: {
                username: "$username",
                score: "$scoreboard.score"
            }
        }
        
    ]);
    
    // const result = await User.find({
    //     gender: "male",
    // }).populate("scoreboard")

    return res.status(200).json({
        error: false,
        result
    })
}

const fetchFemale = async (req, res) => {
    const result = await User.aggregate([
        {
            $match: {
                gender: "female"
            }
        },
        {
            $lookup: {
                from: "scoreboards",
                localField: "scoreboard",
                foreignField: "_id",
                as: "scoreboard"
            }
        },
        {
            $unwind: "$scoreboard"
        },
        {
            $project: {
                username: "$username",
                score: "$scoreboard.score"
            }
        }
    ]);

    // const result = await User.find({
    //     gender: "female"
    // }).populate("scoreboard");

    return res.status(200).json({
        error: false,
        result
    })
}

module.exports = {
    user,
    login,
    register,
    deleteUser,
    allUser,
    allUserStatus,
    fetchFemale,
    fetchMale
}