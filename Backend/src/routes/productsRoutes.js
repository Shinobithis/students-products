const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const productsController = require('../controllers/productsController');
const {model} = require("mongoose");

router.get("/", productsController.getProducts)
router.put("/:id", auth, productsController.putProduct)
router.post("/", auth, productsController.createProduct)
router.delete("/:id", auth, productsController.deleteProduct)

module.exports = router;