const express = require('express');
const router = express.Router();
const db = require("../db");
const IncomingForm = require('formidable').IncomingForm;

router.get("/get", async (req, res) => {
    const user_id = req.query.id;
    const result = await db.query("SELECT * FROM bulding WHERE user_id = ?", user_id);
    res.send({
        error: false,
        data: result
    });
});

router.get("/getOne", async (req, res) => {
    const building_id = req.query.id;
    //console.log(building_id)
    const result = await db.query("SELECT * FROM bulding WHERE id = ?", building_id);
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
        res.send({ error: true, message: "There is a building already registered with this address!!!"});
    } else {
        const result = await db.query(`INSERT INTO bulding SET ?`, building);
        res.send({ error: false, data: "" });
    }
});

router.get("/delete", async (req, res) => {
    const buildingId = req.query.id;
    const result = await db.query("DELETE FROM bulding WHERE id = ?", buildingId);
    res.send({error: false});
});

router.post("/update", async (req, res) => {
    const buildingId = req.body.id;
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

router.post('/new-claim', async (req, res) => {
    const tempObj = { };
    var form = new IncomingForm();
    const fileData = [];

    form.on('fileBegin', function (name, file){
        let filePath = __dirname + '/../resources/' + Date.now() + file.name;
        var path = require('path');
        filePath = path.resolve(filePath);
        fileData.push({
            buildingClaimId: '',
            location: filePath
        });
        file.path = filePath;
    });

    form.on('field', (field, data) => {
        tempObj[field] = data
    });
    form.on('end', async () => {
        let result = await db.query(`insert into building_claims set ?`, tempObj);
        fileData.forEach(async element => {
            element.buildingClaimId = result.insertId;
            await db.query(`insert into photos set ?`, element);
        });
        res.send({ error: false, data: "" });
    });
    form.parse(req);
});

router.get('/claims', async (req, res) => {
    const userId = req.query.id;
    console.log(this.userId)
    let result = await db.query(`select * from building_claims where userId=?`, userId);
    res.send({ error: false, data: result });
});

router.get('/delete-claim/delete', async (req, res) => {
    const claimId = req.query.id;
    let result = await db.query(`delete from building_claims where id = ?`, claimId);
    res.send({ error: false });
});

router.get('/getDownloadLinks', async (req, res) => {
    const claimId = req.query.id;
    console.log(claimId)
    const result = await db.query(`select location from (select * from building_claims where
         id = ?) as a inner join photos where buildingClaimId=id`, claimId);
    res.send({ error: false, data: result }) 
});

module.exports = router;