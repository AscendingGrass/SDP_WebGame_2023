const User = require("../models/Users");
const Scoreboard = require("../models/Scoreboards");

const insertScoreboard = async (req, res) => {
    const { user_id } = req.params;
    const checkUser = await User.findOne({
        _id: user_id
    });

    if (!checkUser) {
        return res.status(200).json({
            error: true,
            msg: "User tidak terdaftar!",
        });
    }

    const newScoreboard = new Scoreboard({
        user_id
    });

    const result = await newScoreboard.save();

    return res.status(200).json({
        error: false,
        msg: "Berhasil menambahkan scoreboard!",
        result
    });
};

const updateScoreboard = async (req, res) => {
    const { user_id, score } = req.body;

    const checkUser = await User.findOne({
        _id: user_id
    });

    if (!checkUser) {
        return res.status(200).json({
            error: true,
            msg: "User tidak terdaftar!",
        });
    }

    const checkScoreboard = await Scoreboard.findOne({
        user_id: user_id
    })

    if(!checkScoreboard){
        return res.status(200).json({
            error: true,
            msg: "Scoreboard tidak ada!"
        })
    }

    checkScoreboard.$set({
        score: score
    })

    const result = await checkScoreboard.save();

    return res.status(200).json({
        error: false,
        msg: "Scoreboard berhasil diupdate!",
        result /* Your result object or data here */
    });
};

const deleteScoreboard = async (req, res) => {
    const { user_id } = req.body;

    const checkUser = await User.findOne({
        _id: user_id
    });

    if (!checkUser) {
        return res.status(200).json({
            error: true,
            msg: "User tidak terdaftar!"
        });
    }

    const checkScoreboard = await Scoreboard.findOne({
        user_id: user_id
    })

    if(!checkScoreboard){
        return res.status(200).json({
            error: true,
            msg: "Scoreboard tidak ada!"
        })
    }

    checkScoreboard.$set({
        status: "dead",
        deleted_at: Date.now()
    })

    const result = await checkScoreboard.save();

    return res.status(200).json({
        error: false,
        msg: "Scoreboard berhasil didelete!",
        result
    });
};

module.exports = {
    insertScoreboard,
    updateScoreboard,
    deleteScoreboard
};
