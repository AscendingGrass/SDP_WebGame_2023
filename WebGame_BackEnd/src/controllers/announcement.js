const Announcement = require("../models/Announcement");

const dummyData = async (req, res)=>{
    const sampleNews = [
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Patch v1.1.0 Released - Bug Fixes Galore!',
            description: 'We\'ve just released a new patch (v1.1.0) that addresses various bugs and improves overall game stability. Thank you for your feedback!',
            created_at: new Date('2023-01-10T08:30:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Exciting News: New Expansion Coming Soon!',
            description: 'Get ready for an epic adventure! Our team is thrilled to announce a new expansion that will introduce fresh content, challenges, and more. Stay tuned for updates!',
            created_at: new Date('2023-02-20T14:45:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Account Suspension Notice',
            description: 'Due to a violation of our terms of service, the account associated with username "Player123" has been suspended. Fair play is crucial for a positive gaming environment.',
            created_at: new Date('2023-03-05T10:00:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Farewell, Explorer123!',
            description: 'It is with mixed emotions that we bid farewell to "Explorer123." The player has decided to delete their account. We appreciate the time spent in our gaming community and wish them the best on their future endeavors.',
            created_at: new Date('2023-04-15T16:20:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Critical Server Issue Resolved',
            description: 'We\'ve successfully resolved a critical server issue that was affecting gameplay for some users. Thank you for your patience during the resolution process.',
            created_at: new Date('2023-05-08T12:15:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Double XP Weekend Event!',
            description: 'Gear up for a weekend of intense gaming! Enjoy double XP across all game modes from Friday to Sunday. It\'s the perfect opportunity to level up your character!',
            created_at: new Date('2023-06-22T18:30:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Multiple Account Violations',
            description: 'Several accounts found to be in violation of our terms of service have been permanently banned. We remain committed to maintaining a fair and enjoyable gaming environment.',
            created_at: new Date('2023-07-10T09:45:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Stepping Away from the Adventure',
            description: 'Player "EpicQuester" has decided to step away from the gaming adventure and delete their account. We appreciate their contributions to the community and wish them the best.',
            created_at: new Date('2023-08-18T14:10:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'UI Improvements and Visual Tweaks',
            description: 'In response to player feedback, we\'ve made several UI improvements and visual tweaks to enhance the overall gaming experience. We hope you enjoy the changes!',
            created_at: new Date('2023-09-05T11:30:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Seasonal Event: Festive Frenzy!',
            description: 'Get ready for a festive celebration! Join us in the seasonal event "Festive Frenzy" with special quests, rewards, and holiday-themed surprises. Happy gaming!',
            created_at: new Date('2023-10-12T16:45:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Fair Play Enforcement',
            description: 'As part of our commitment to fair play, we\'ve taken action against accounts involved in cheating or exploiting game mechanics. Let\'s ensure a level playing field for everyone!',
            created_at: new Date('2023-11-03T08:20:00Z'),
        },
        { 
            user_id: "65708166aabb061ce50dbc05",
            title: 'Closing a Chapter',
            description: 'Player "MysticExplorer" bids farewell to the gaming world. We appreciate the memorable moments shared and wish them success in their future endeavors.',
            created_at: new Date('2023-12-19T13:55:00Z'),
        },
        // Add more news entries as needed
    ];
    
    const result = await Announcement.insertMany(sampleNews);
    return res.status(200).json({
        error: false,
        result
    })
}

const insertAnnoucement = async (req, res) => {
    const body = req.body;

    const result = await Announcement.create({
        ...body
    });
    return res.status(200).json({
        error: false,
        result
    })
}

const getAllAnnouncement = async (req, res) => {
    const result = await Announcement.find();

    return res.status(200).json({
        error: false,
        result
    })
}

const getLatestAnnouncement = async (req, res) => {
    const result = await Announcement.find().sort({created_at: -1}).limit(3);

    return res.status(200).json({
        error: false,
        result
    })
}

module.exports = {
    dummyData,
    insertAnnoucement,
    getAllAnnouncement,
    getLatestAnnouncement
}