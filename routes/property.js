const express = require('express');
const router = express.Router();
const db = require("../db");

router.get("/get", async (req, res) => {
    const user_id = req.query.id;
    const result = await db.query("SELECT * FROM bulding WHERE user_id = ?", user_id);
    res.send({
        error: false,
        data: result
    });
});

router.post("/new", async (req, res) => {
    console.log(req.body)
    const building = {
        estimate_Value: req.body.estValue,
        address: req.body.address,
        type: req.body.type,
        user_id: req.body.userId
    };
    let tempResult = await db.query("SELECT * FROM bulding WHERE address = ? ", building.address);
    if (tempResult.length > 0) {
        res.send({message: "There is a building already registered with this address!!!"});
    } else {
        const result = await db.query(`INSERT INTO bulding SET ?`, building);
        res.send({ error: false, data: "" });
    }
});

router.delete("/delete", async (req, res) => {
    const buildingId = req.query.id;
    const result = await db.query("DELETE FROM bulding WHERE id = ?", buildingId);
    console.log(result);
});

router.put("/update", async (req, res) => {
    const buildingId = req.query.id;
    const building = {
        estimate_Value: req.body.estValue,
        address: req.body.address,
        type: req.body.type,
        user_id: req.body.userId
    };
    let tempResult = await db.query(`SELECT * FROM bulding WHERE id = ${buildingId}`);
    if (tempResult.length == 0) {
        res.send({message: "There is no building registered!!!"});
    } else {
        const result = await db.query(`UPDATE bulding SET ? WHERE id = ?`, [building, buildingId]);
        res.send({ error: false, data: "" });
    }
});

module.exports = router;