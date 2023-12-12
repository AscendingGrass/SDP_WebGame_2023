const insertScoreboard = async (req, res)=>{
    const { id } = req.body;
    const newScoreboard = new Scoreboard({
        user_id: id
    });
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
}

const deleteScoreboard = async (req, res)=>{
    const { username, email, password, confirm_password, gender } = req.body;

    const checkUsername = await User.findOne({
        username
    });

    if(checkUsername){
        return res.status(200).json({
            status: false,
            error: "Username telah terpakai"
        })
    }

    const checkEmail = await User.findOne({
        email
    })

    if(checkEmail){
        return res.status(200).json({
            status: false,
            error: "Email telah terpakai"
        })
    }

    if(password != confirm_password){
        return res.status(200).json({
            status: false,
            error: "Password tidak sama!"
        })
    }

    const newUser = new User({
        username, email, password, gender
    });

    const result = await newUser.save();
    return res.status(200).json({
        status: true,
        result
    });

};

module.exports = {
    insertScoreboard,
    deleteScoreboard
}