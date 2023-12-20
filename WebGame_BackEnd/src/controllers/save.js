const User = require("../models/Users");
const Save = require("../models/Saves");

const save = async (req, res) => {
    const { user_id } = req.params;
    const  body = req.body;

    const checkUser = await User.findById(user_id);
    if(!checkUser){
        return res.status(200).json({
            error: true,
            msg: "User tidak ada!"
        })
    }

    const result = await Save.create({
        user_id,
        state: body
    })
    const updatePlayer = await checkUser.set({
        save: result._id
    });

    res.status(200).json({
        error: false,
        msg: "Save successful!",
        result: result,
    });
}