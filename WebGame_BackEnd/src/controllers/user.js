const { ObjectId } = require('mongodb');
const Scoreboard = require("../models/Scoreboards");
const User = require("../models/Users");
const jwt = require('jsonwebtoken');

const secret_key = "t12345!";

const insertDummy = async (req, res) => {
    const result = [
        await User.insertMany(
            [
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5b6"),
                    "username": "adminITLAND",
                    "password": "ITLAND123!",
                    "email": "admin@example.com",
                    "role": "admin",
                    "gender": "Male",
                    "status": "active",
                    "created_at": new Date(1702811456858)
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5b7"),
                    "username": "johnson",
                    "password": "123456789",
                    "email": "jonhson@gmail.com",
                    "role": "user",
                    "gender": "male",
                    "volume": 42,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5bd"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5b8"),
                    "username": "mary_smith",
                    "password": "mary123",
                    "email": "mary.smith@email.com",
                    "role": "user",
                    "gender": "female",
                    "volume": 30,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5be"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5b9"),
                    "username": "robert_jones",
                    "password": "robert456",
                    "email": "robert.jones@example.net",
                    "role": "user",
                    "gender": "male",
                    "volume": 18,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5bf"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5ba"),
                    "username": "alice_doe",
                    "password": "alice789",
                    "email": "alice.doe@email.com",
                    "role": "user",
                    "gender": "female",
                    "volume": 25,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5c0"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5bb"),
                    "username": "peter_green",
                    "password": "green123",
                    "email": "peter.green@example.org",
                    "role": "user",
                    "gender": "male",
                    "volume": 15,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5c1"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed740dc599aa08645f5bc"),
                    "username": "susan_wilson",
                    "password": "susan456",
                    "email": "susan.wilson@email.com",
                    "role": "user",
                    "gender": "female",
                    "volume": 35,
                    "scoreboard": new ObjectId("657ed9c4dc599aa08645f5c2"),
                    "status": "active",
                    "created_at": new Date(1702811456858),
                    "updated_at": null,
                    "deleted_at": null
                }
            ]
        ),
        await Scoreboard.insertMany(
            [
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5bd"),
                    "user_id": "657ed740dc599aa08645f5b6",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5be"),
                    "user_id": "657ed740dc599aa08645f5b7",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5bf"),
                    "user_id": "657ed740dc599aa08645f5b8",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5c0"),
                    "user_id": "657ed740dc599aa08645f5b9",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5c1"),
                    "user_id": "657ed740dc599aa08645f5ba",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5c2"),
                    "user_id": "657ed740dc599aa08645f5bb",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                },
                {
                    "_id": new ObjectId("657ed9c4dc599aa08645f5c3"),
                    "user_id": "657ed740dc599aa08645f5bc",
                    "score": 0,
                    "status": "active",
                    "created_at": new Date("2023-01-15T08:30:00.000Z"),
                    "updated_at": null,
                    "deleted_at": null
                }
            ]
        )
    ];

    return res.status(200).json({
        error: false,
        msg: "Success",
        result
    })
}

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

    const newUser = await User.create({
        username, password, gender, email,
        role: "user"
    });

    const scoreboard = await Scoreboard.create({
        user_id: newUser._id,
    });

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
    const { status } = req.params;
    const page = parseInt(req.query.page)
    console.log(req.body);

    let totalUsers;
    let totalPages;

    let result;
    if(status){
        totalUsers = await User.countDocuments({
            status
        });

        totalPages = Math.ceil(totalUsers / 4);

        result = await User.find({
            status
        }).skip((page - 1) * 4).limit(4);
    }else{
        totalUsers = await User.countDocuments();
        
        totalPages = Math.ceil(totalUsers / 4);

        result = await User.find().skip((page - 1) * 4).limit(4);
    }
    
    return res.status(200).json({
        error: false,
        result,
        totalPages,
    })
}

const fetchUser = async (req, res) => {
    const { gender } = req.query;
    const result = await User.aggregate([
        {
            $match: {
                gender
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

    return res.status(200).json({
        error: false,
        result
    })
}

module.exports = {
    user,
    insertDummy,
    login,
    register,
    deleteUser,
    allUser,
    fetchUser
}