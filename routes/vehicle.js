const express = require('express');
const router = express.Router();
const db = require("../db");
const IncomingForm = require('formidable').IncomingForm;

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
        user_id: req.body.userId,
        insuranceType: req.body.insuranceType
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

router.post('/new-claim', async (req, res) => {
    const tempObj = { };
    var form = new IncomingForm();
    const fileData = [];

    form.on('fileBegin', function (name, file){
        let filePath = __dirname + '/../resources/' + Date.now() + file.name;
        var path = require('path');
        filePath = path.resolve(filePath);
        fileData.push({
            vehicleClaimId: '',
            location: filePath
        });
        file.path = filePath;
    });

    form.on('field', (field, data) => {
        tempObj[field] = data
    });
    form.on('end', async () => {
        console.log(tempObj)
        let result = await db.query(`insert into vehicle_claims set ?`, tempObj);
        fileData.forEach(async element => {
            element.vehicleClaimId = result.insertId;
            await db.query(`insert into photos set ?`, element);
        });
        res.send({ error: false, data: "" });
    });
    form.parse(req);
});

router.get('/claims', async (req, res) => {
    const userId = req.query.id;
    console.log(this.userId)
    let result = await db.query(`select * from vehicle_claims where userId=?`, userId);
    res.send({ error: false, data: result });
});

router.get('/delete-claim/delete', async (req, res) => {
    const claimId = req.query.id;
    let result = await db.query(`delete from vehicle_claims where id = ?`, claimId);
    res.send({ error: false });
});

router.get('/getDownloadLinks', async (req, res) => {
    const claimId = req.query.id;
    console.log(claimId)
    const result = await db.query(`select location from (select * from vehicle_claims where
         id = ?) as a inner join photos where vehicleClaimId=id`, claimId);
    res.send({ error: false, data: result }) 
});

module.exports = router;