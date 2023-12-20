const Bug = require("../models/Bugs");

const postBug = async (req, res) => {
    const { user_id, title, description } = req.body;

    const result = await Bug.create({
        user_id,
        title,
        description,
        status: "PENDING",
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

    let totalBugsReport;
    let totalPages;

    let result;
    if(status){
        totalBugsReport = await Bug.countDocuments({
            status
        });

        totalPages = Math.ceil(totalBugsReport / 4);

        result = await Bug.find({
            status
        }).skip((page - 1) * 4).limit(4);
    }else{
        totalBugsReport = await Bug.countDocuments();
        
        totalPages = Math.ceil(totalBugsReport / 4);

        result = await Bug.find().skip((page - 1) * 4).limit(4);
    }
    
    return res.status(200).json({
        error: false,
        result,
        totalPages,
    })
}

module.exports = {
    fetchBugReport,
}