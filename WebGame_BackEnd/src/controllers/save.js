const User = require("../models/Users");
const Save = require("../models/Saves");
const Scoreboard = require("../models/Scoreboards");

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
    const updatePlayer = await checkUser.updateOne({
        saveState: result._id,
    });

    const updateScore = await Scoreboard.findByIdAndUpdate(checkUser.scoreboard, {score: body.score})

    res.status(200).json({
        error: false,
        msg: "Save successful!",
        result: result,
    });
}

const load = async (req, res) => {
    const { user_id } = req.params;
    const  body = req.body;

    try{

        const checkUser = await User.findById(user_id);
        if(!checkUser){
            return res.status(400).json({
                error: true,
                msg: "User tidak ada!"
            })
        }

        const save = await Save.findById(checkUser.saveState)
        console.log(save)

        res.status(200).json({
            error: false,
            msg: "Load successful!",
            result: save.state,
        });
    }
    catch(err){
        res.status(200).json({
            error: true,
            msg: err.message,
            result: null,
        });
    }

}

module.exports = {
    save,
    load
}