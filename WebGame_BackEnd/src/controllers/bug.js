const Bug = require("../models/Bugs");
const User = require("../models/Users");

const dummyBug = async (req, res) => {
    const users = await User.find();
    const usersWithId = users.map(user => ({ ...user.toObject(), _id: user._id.toString() }));

    const temp = await Promise.all(users.map(async (element, index) => {
        return {
            "user_id": usersWithId[index % usersWithId.length]._id,
            "title": `Bug ${index + 1}: ${index % 2 === 0 ? 'UI Issue' : 'Functionality Problem'}`,
            "description": `Description for Bug ${index + 1}`,
            "screenshot": `screenshot_url_${index + 1}`,
            "status": ["report", "fixed", "duplicate", "accepted"][index % 4],
            "created_at": new Date(),
        };
    }));

    const result = await Bug.insertMany(temp);
    return res.status(200).json(result);
}

const postBug = async (req, res) => {
    const { user_id, title, description } = req.body;

    const result = await Bug.create({
        user_id,
        title,
        description,
        status: "report",
    });

    return res.status(200).json({
        error: false,
        msg: "Query success",
        result
    })

}

const fetchBugReport = async (req, res) => {
    const { status } = req.params;
    const page = parseInt(req.query.page);
    console.log(status +" " + page);
    let totalBugsReport;
    let totalPages;

    let result;
    if(status){
        totalBugsReport = await Bug.countDocuments({
            status
        });

        totalPages = Math.ceil(totalBugsReport / 4);

        result = await Bug.aggregate([
            {
                $match: {
                    status
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    user: "$user.username",
                    role: "$user.role",
                    title: 1,
                    description: 1,
                    screenshot: 1,
                    status: 1,
                    created_at: 1,
                }
            }
        ]).skip((page - 1) * 4).limit(4);
    }else{
        totalBugsReport = await Bug.countDocuments();
        
        totalPages = Math.ceil(totalBugsReport / 4);

        result = result = await Bug.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    user: "$user.username",
                    role: "$user.role",
                    title: 1,
                    description: 1,
                    screenshot: 1,
                    status: 1,
                    created_at: 1,
                }
            }
        ]).skip((page - 1) * 4).limit(4);
    }
    
    return res.status(200).json({
        error: false,
        result,
        totalPages,
    })
}

const updateBug = async (req, res) => {
    const { _id } = req.params;
    const { status } = req.query;
    const result = await Bug.findByIdAndUpdate(_id, {
        status
    })

    return res.status(200).json({
        error: false,
        msg: "BERHASL",
        result,
    })
}

module.exports = {
    dummyBug,
    fetchBugReport,
    updateBug
}