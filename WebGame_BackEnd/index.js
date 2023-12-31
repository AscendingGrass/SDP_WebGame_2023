require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));

const bugRouter = require('./src/routes/bug');
const userRouter = require("./src/routes/user");
const scoreboardRouter = require("./src/routes/scoreboard");
const announcementRouter = require("./src/routes/announcement");
const saveRouter = require("./src/routes/save");
const helpRouter = require("./src/routes/help");

app.get('/', (req, res) => res.send('Hello World!'))
app.use("/", bugRouter);
app.use("/", userRouter);
app.use("/", scoreboardRouter);
app.use("/", announcementRouter);
app.use("/", saveRouter);
app.use("/", helpRouter);

app.listen(port, async () => {
    try {
        await mongoose.connect("mongodb+srv://team:teamsdp2023@cluster-m0.8pfwkar.mongodb.net/webgame?retryWrites=true&w=majority")
        console.log('Database connected')
    } catch (e) {
        console.log('Error database connection \n', e)
    }
    console.log(`Listening on port ${port}!`);
});
