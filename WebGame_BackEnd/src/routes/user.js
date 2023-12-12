const express = require("express");
const router = express();

const User = require("../models/Users");
const { login, register, deleteUser, user } = require("../controllers/user");

// GET
router.get("/user/:id", user)

// POST
router.post("/login", login);
router.post("/register", register);

// PUT

// DELETE
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;