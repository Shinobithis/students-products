const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const studentsController = require('../controllers/studentsController');
const {model} = require("mongoose");

router.get("/", auth, studentsController.getStudents)
// router.get("/:id", studentsController.getOneStudents)
// router.post("/", studentsController.postStudent)
router.put("/:id", auth, studentsController.putStudents)
// router.delete("/:id", studentsController.deletestudents)

module.exports = router;