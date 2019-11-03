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
        res.send({ error: false, message: "success" });
    } else if (!req.body.vehicle_id && req.body.building_id) {
        const tempObj = {
            building_id: req.body.building_id,
            customer_id: req.body.customer_id,
            broker_id: req.body.broker_id
        };
        const result = await db.query(`insert into customer_request
        set ?`, tempObj);
        res.send({ error: false, message: "success" });
    } else {
        res.send({ error: true, message: "Two properties cannot exist!!!" });
    }
});

router.get('/quotations', async (req, res) => {
    const customer_id = req.query.id;
    console.log(customer_id);
    const result = await db.query(`select * from customer_request where customer_id = ? and policy_status <> 3`, customer_id);
    res.send({ error: false, data: result });
});

router.get('/getAllQuotations', async (req, res) => {
    const result = await db.query(`select * from quotation`);
    res.send({ error: false, data: result });
});

router.get('/getAllPolicies', async (req, res) => {
    const result = await db.query(`select * from policy`);
    res.send({ error: false, data: result });
});

router.get('/downloadDocument', async (req, res) => {
    console.log(req.query.filePath)
    res.download(req.query.filePath);
});

router.post('/acceptQuotation', async (req, res) => {
    const quotationId = req.body.quotationId;
    const requestId = req.body.requestId;
    console.log(requestId)
    console.log(quotationId)
    const result = await db.query(`update customer_request set customer_acceptance=1,
     quotation_id=${quotationId} where Request_ID=${requestId}`);
    res.send({ error: false, data: result });
});

router.get('/acceptPolicy', async (req, res) => {
    const requestId = req.query.requestId;
    console.log(requestId)
    const result = await db.query(`update customer_request set policy_status=3 where Request_ID=${requestId}`);
    res.send({ error: false, data: result });
});

router.get('/rejectQuotation', async (req, res) => {
    const requestId = req.query.requestId;
    console.log(requestId)
    const result = await db.query(`update customer_request set customer_acceptance=2 where Request_ID=${requestId}`);
    res.send({ error: false, data: result });
});

router.get('/rejectPolicy', async (req, res) => {
    const requestId = req.query.requestId;
    console.log(requestId)
    const result = await db.query(`update customer_request set policy_status=4 where Request_ID=${requestId}`);
    res.send({ error: false, data: result });
});

router.get('/premiumHistory', async (req, res) => {
    const customer_id = req.query.id;
    console.log(customer_id);
    const result = await db.query(`select * from customer_request where customer_id = ? and policy_status = 3`, customer_id);
    res.send({ error: false, data: result });
});

router.get('/premiumData', async (req, res) => {
    const Quatation_ID = req.query.id;
    console.log(Quatation_ID)
    const result = await db.query(`select * from premum where Quatation_ID = ?`, Quatation_ID);
    res.send({ error: false, data: result });
});

router.get('/unpaidPremiumData', async (req, res) => {
    const Quatation_ID = req.query.id;
    console.log(Quatation_ID)
    const result = await db.query(`select * from premum where Quatation_ID = ? and notification = 0`, Quatation_ID);
    res.send({ error: false, data: result });
});

router.post('/payPremium', async (req, res) => {
    console.log(req.body)
    const tempObj = {
        notification: req.body.notification,
        Payment_date: req.body.Payment_date
    }
    const result = await db.query(`update premum set ? where Premum_ID = ?`, [tempObj, req.body.Premum_ID]);
    res.send({ error: false, data: result });
});

module.exports = router;