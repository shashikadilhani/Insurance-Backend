const express = require('express');
const router = express.Router();
const db = require("../db");

router.get("/get", async (req, res) => {
    const user_id = req.query.id;
    const result = await db.query("SELECT * FROM vehicle WHERE user_id = ?", user_id);
    res.send({
        error: false,
        data: result
    });
});

router.get("/getOne", async (req, res) => {
    const vehicle_id = req.query.id;
    const result = await db.query("SELECT * FROM vehicle WHERE vehicle_ID = ?", vehicle_id);
    res.send({
        error: false,
        data: result
    });
});

router.post("/new", async (req, res) => {
    const vehicle = {
        Model: req.body.model,
        type: req.body.type,
        number: req.body.number,
        Mauf_Year: req.body.manfYear,
        Market_Value: req.body.marketVal,
        v_usage: req.body.vehiUsage,
        fugi_type: req.body.fuelType,
        meta: req.body.meta,
        user_id: req.body.userId
    };
    let tempResult = await db.query(`SELECT * FROM vehicle WHERE number = '${vehicle.number}'`);
    if (tempResult.length > 0) {
        res.send({error: true, message: "There is a vehicle already registered with this number!!!"});
    } else {
        console.log(tempResult)
        const result = await db.query(`INSERT INTO vehicle SET ?`, vehicle);
        res.send({ error: false, data: "" });
    }
});

router.get("/delete", async (req, res) => {
    const vehicleId = req.query.id;
    const result = await db.query("DELETE FROM vehicle WHERE vehicle_ID = ?", vehicleId);
    res.send({error: false});
});

router.post("/update", async (req, res) => {
    const vehicleId = req.body.vehicle_ID;
    const vehicle = {
        Model: req.body.model,
        type: req.body.type,
        number: req.body.number,
        Mauf_Year: req.body.manfYear,
        Market_Value: req.body.marketVal,
        v_usage: req.body.vehiUsage,
        fugi_type: req.body.fuelType,
        meta: req.body.meta,
        user_id: req.body.userId
    };
    let tempResult = await db.query(`SELECT * FROM vehicle WHERE vehicle_ID = ${vehicleId}`);
    if (tempResult.length == 0) {
        res.send({error: true, message: "There is no vehicle registered!!!"});
    } else {
        console.log(vehicleId)
        console.log(vehicle)
        const result = await db.query(`UPDATE vehicle SET ? WHERE vehicle_ID = ?`, [vehicle, vehicleId]);
        res.send({ error: false, data: "" });
    }
});

module.exports = router;