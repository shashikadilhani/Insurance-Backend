const express = require('express');
const router = express.Router();
const db = require("../db");

const vehicle = require("./vehicle");
const building = require("./building");
router.use("/vehicle", vehicle);
router.use("/building", building);

router.post("/quotationReq", async (req, res) => {
    if (req.body.vehicle_id && !req.body.building_id) {
        const tempObj = {
            vehicle_id: req.body.vehicle_id,
            customer_id: req.body.customer_id,
            broker_id: req.body.broker_id
        };
        const result = await db.query(`insert into customer_request
        set ?`, tempObj);
        res.send({error: false, message: "success"});
    } else if (!req.body.vehicle_id && req.body.building_id) {
        const tempObj = {
            building_id: req.body.building_id,
            customer_id: req.body.customer_id,
            broker_id: req.body.broker_id
        };
        const result = await db.query(`insert into customer_request
        set ?`, tempObj);
        res.send({error: false, message: "success"});
    } else {
        res.send({error: true, message: "Two properties cannot exist!!!"});
    }
});

module.exports = router;