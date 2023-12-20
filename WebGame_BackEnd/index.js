const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    optionSucessStatus: 200
}));

const bugRouter = require('./src/routes/bug');
const userRouter = require("./src/routes/user");
const scoreboardRouter = require("./src/routes/scoreboard");
const announcementRouter = require("./src/routes/announcement");
const saveRouter = require("./src/routes/save");

app.get('/', (req, res) => res.send('Hello World!'))
app.use("/", bugRouter);
app.use("/", userRouter);
app.use("/", scoreboardRouter);
app.use("/", announcementRouter);
app.use("/", saveRouter);

app.listen(port, async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/webgame')
        console.log('Database connected')
    }
    catch(e){
        console.log('Error database connection \n', e)
    }
    console.log(`listening on port ${port}!`)
})