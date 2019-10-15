const express = require('express');
const router = express.Router();
const db = require("../db");

const vehicle = require("./vehicle");
const property = require("./property");
router.use("/vehicle", vehicle);
router.use("/property", property);

router.post("/quotationReq", (req, res) => {
    const vehicle_ID = req.body.vehicle_ID;
    const property_ID = req.body.property_ID;
    const user_ID = req.body.user_ID;
    if (vehicle_ID && !property_ID) {

    } else if (!vehicle_ID && property_ID) {

    } else {
        res.send({error: true, message: "Two properties cannot exist!!!"});
    }
});

module.exports = router;