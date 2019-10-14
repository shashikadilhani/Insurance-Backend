const express = require("express");
const router = express.Router();
const connection = require("./config");
const db = require("../db");
const upload = multer({ dest: "uploads/" });

module.exports = router;
