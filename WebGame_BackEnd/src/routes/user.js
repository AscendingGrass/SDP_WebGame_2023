const express = require("express");
const router = express();

const User = require("../models/Users");
const { login, register, deleteUser, user, allUser, save, insertDummy, fetchUser } = require("../controllers/user");

// GET
router.get("/user/:id", user)
router.get("/allUser", allUser)
router.get("/allUser/:status", allUser)
router.get("/user", fetchUser);

// POST
router.post("/login", login);
router.post("/register", register);
router.post("/dummyInsertUser", insertDummy);

// PUT

// DELETE
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;