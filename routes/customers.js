const express = require('express');
const router = express.Router();
const db = require("../db");

const vehicle = require("./vehicle");
const property = require("./property");
router.use("/vehicle", vehicle);
router.use("/property", property);

module.exports = router;