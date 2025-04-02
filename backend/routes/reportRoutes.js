const express=require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { exportTasksReport, exportUsersReport } = require("../controller/reportController");


const router=express.Router();

router.get("/export/tasks",protect,adminOnly,exportTasksReport);
router.get("/export/users",protect,adminOnly,exportUsersReport);

module.exports=router