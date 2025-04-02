const express=require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controller/userController");

const router=express.Router();

//User Management Routes
router.get("/",protect,adminOnly,getUsers); //Get all users (Admin Only)
router.get("/:id",protect,getUserById); //Get a specfic user

module.exports=router;