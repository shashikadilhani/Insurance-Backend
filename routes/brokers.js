const express = require("express");
const router = express.Router();
var connection = require("./config");
const db = require("../db");
const IncomingForm = require('formidable').IncomingForm;

router.get("/getAll", async (req, res) => {
  let users = await db.query(
    "SELECT * FROM users WHERE role_id=3 AND isActivated=true"
  );
  res.send({ error: false, message: "", data: users });
});

router.get("/pending", async (req, res) => {
  let users = await db.query(
    "SELECT * FROM users WHERE role_id=3 AND isActivated=false"
  );
  res.send({ error: false, message: "", data: users });
});

router.post("/city", async (req, res) => {
  let city = req.body.city;
  let result = await db.query(
    `SELECT * FROM users WHERE role_id=3 AND isActivated=true AND city=?;`,
    [city]
  );
  res.send({ error: false, message: "", data: result });
});

router.get("/delete", async (req, res) => {
  let id = req.query.id;
  let result = await db.query(`DELETE FROM users WHERE user_id=${id};`);
  res.send({ error: false, message: "", data: result });
});

router.get("/approve", async (req, res) => {
  let id = req.query.id;
  let result = await db.query(
    `UPDATE users SET isActivated=true WHERE user_id=${id};`
  );
  res.send({ error: false, message: "", data: result });
});

router.post("/new", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  // const salt = await bcrypt.genSalt(10);

  let password = req.body.password;
  //console.log(req.body);
  let email = req.body.email;
  let upassword = await bcrypt.hash(password, salt);

  let role_id;
  if (req.body.role == "Admin") {
    role_id = 1;
  } else if (req.body.role == "Customer") {
    role_id = 3;
  } else if (req.body.role == "Broker") {
    role_id = 2;
  }
  var users = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: upassword,
    address: req.body.address,
    nic: req.body.nic,
    phone_num: req.body.phone_num,
    isActivated: req.body.isActivated,
    role_id: role_id
  };

  let user = connection.query("SELECT * FROM users WHERE email = ?", [email]);

  console.log(user);

  connection.query("SELECT * FROM users WHERE email = ?", [email], function (
    err,
    result
  ) {
    if (result.length > 0) {
      res.send({
        message: "user already registered for this email"
      });
    } else {
      connection.query("INSERT INTO users SET ?", users, function (
        error,
        results
      ) {
        if (error) {
          res.json({
            status: false,
            message: "there are some error with query",
            ...error
          });
        } else {
          res.send(_.pick(users, ["id", "fullname", "email"]));
          //   console.log(results);
        }
      });
    }
  });
});

router.get('/policies', async (req, res) => {
  const result = await db.query(`select * from policy`);
  res.send({ error: false, data: result });
});

router.post('/new-policy', async (req, res) => {
  const tempObj = {};
  var form = new IncomingForm();

  form.on('fileBegin', function (name, file) {
    let filePath = __dirname + '/../resources/' + Date.now() + file.name;
    var path = require('path');
    filePath = path.resolve(filePath);
    file.path = filePath;
    tempObj['location'] = filePath;
  });

  form.on('field', (field, data) => {
    tempObj[field] = data
  });
  form.on('end', async () => {
    console.log(tempObj)
    let result = await db.query(`insert into policy set ?`, tempObj);
    res.send({ error: false, data: "" });
  });
  form.parse(req);
});

router.get('/downloadDocument', async (req, res) => {
  console.log(req.query.filePath)
  res.download(req.query.filePath);
});

router.get('/quotations', async (req, res) => {
  const result = await db.query(`select * from quotation`);
  res.send({ error: false, data: result });
});


router.post('/new-quotation', async (req, res) => {
  const tempObj = {};
  var form = new IncomingForm();

  form.on('fileBegin', function (name, file) {
    let filePath = __dirname + '/../resources/' + Date.now() + file.name;
    var path = require('path');
    filePath = path.resolve(filePath);
    file.path = filePath;
    tempObj['location'] = filePath;
  });

  form.on('field', (field, data) => {
    console.log(field)
    console.log(data)
    tempObj[field] = data;
  });
  form.on('end', async () => {
    console.log(tempObj)
    let result = await db.query(`insert into quotation set ?`, tempObj);
    res.send({ error: false, data: "" });
  });
  form.parse(req);
});

router.get('/policies-delete', async (req, res) => {
  const policyId = req.query.id;
  const result = await db.query(`delete from policy where policy_id = ?`, policyId);
  res.send({ error: false, data: result });
});

router.get('/quotations-delete', async (req, res) => {
  const quotationId = req.query.id;
  const result = await db.query(`delete from quotation where Quotation_ID = ?`, quotationId);
  res.send({ error: false, data: result });
});

router.get('/quotationRequests', async (req, res) => {
  const brokerId = req.query.id;
  const result = await db.query(`SELECT fullname,address,city,phone_num,email,nic,
  REQUEST_ID,vehicle_id,building_id,is_Accepted FROM (SELECT * FROM customer_request WHERE broker_id='${brokerId}' and is_Accepted<>1) 
  AS a INNER JOIN users WHERE a.customer_id=users.user_id`);
  console.log(result)
  res.send(result);
});

router.get('/acceptedQuotationRequests', async (req, res) => {
  const brokerId = req.query.id;
  const result = await db.query(`SELECT fullname,address,city,phone_num,email,nic,
  REQUEST_ID,vehicle_id,building_id,customer_acceptance,policy_status,quotation_id,policy_id
   FROM (SELECT * FROM customer_request WHERE broker_id='${brokerId}' and is_Accepted=1 and policy_status<>3) 
  AS a INNER JOIN users WHERE a.customer_id=users.user_id`);
  console.log(result)
  res.send(result);
});

router.get('/acceptedQuotationHistoryData', async (req, res) => {
  const brokerId = req.query.id;
  const result = await db.query(`SELECT fullname,address,city,phone_num,email,nic,
  REQUEST_ID,vehicle_id,building_id,quotation_id,policy_id
   FROM (SELECT * FROM customer_request WHERE broker_id='${brokerId}' and policy_status=3) 
  AS a INNER JOIN users WHERE a.customer_id=users.user_id`);
  console.log(result)
  res.send(result);
});

router.get('/premiumData', async (req, res) => {
  const Quatation_ID = req.query.id;
  console.log(Quatation_ID)
  const result = await db.query(`select * from premum where Quatation_ID = ?`, Quatation_ID);
  res.send({ error: false, data: result });
});

router.post('/newPremium', async (req, res) => {
  const tempObj = {
    Quatation_ID: req.body.requestId,
    Payment_Amount: req.body.paymentAmount
  };
  const result = await db.query(`insert into premum set ?`, tempObj);
  res.send({ error: false, data: result });
});

router.post('/sendPolicy', async (req, res) => {
  const requestId = req.body.requestId;
  const policyId = req.body.policyId;
  console.log(requestId)
  console.log(policyId)
  const result = await db.query(`update customer_request set policy_status=1, policy_id=${policyId} where Request_ID=${requestId}`);
  res.send({ error: false, data: result });
});

router.get('/acceptQuotation', async (req, res) => {
  const quotationId = req.query.id;
  console.log(quotationId)
  const result = await db.query(`update customer_request set is_Accepted=1 where Request_ID=?`, quotationId);
  res.send({ error: false, data: result });
});

router.get('/rejectQuotation', async (req, res) => {
  const quotationId = req.query.id;
  console.log(quotationId)
  const result = await db.query(`update customer_request set is_Accepted=2 where Request_ID=?`, quotationId);
  res.send({ error: false, data: result });
});

router.get('/vehicleQuotation', async (req, res) => {
  const vehicleId = req.query.id;
  const result = await db.query(`SELECT * from vehicle where vehicle_ID=?`, vehicleId);
  res.send(result);
});

router.get('/buildingQuotation', async (req, res) => {
  const buildingId = req.query.id;
  const result = await db.query(`SELECT * from bulding where id=?`, buildingId);
  res.send(result);
});

router.get('/building/claims', async (req, res) => {
  const userId = req.query.id;
  console.log(this.userId)
  let result = await db.query(`select * from building_claims where brokerid=?`, userId);
  res.send({ error: false, data: result });
});

router.get("/building/getOne", async (req, res) => {
  const building_id = req.query.id;
  //console.log(building_id)
  const result = await db.query("SELECT * FROM bulding WHERE id = ?", building_id);
  res.send({
    error: false,
    data: result
  });
});

router.get('/building/getDownloadLinks', async (req, res) => {
  const claimId = req.query.id;
  console.log(claimId)
  const result = await db.query(`select location from (select * from building_claims where
       id = ?) as a inner join photos where buildingClaimId=id`, claimId);
  res.send({ error: false, data: result })
});


router.get('/vehicle/claims', async (req, res) => {
  const userId = req.query.id;
  console.log(this.userId)
  let result = await db.query(`select * from vehicle_claims where brokerid=?`, userId);
  res.send({ error: false, data: result });
});

router.get("/vehicle/getOne", async (req, res) => {
  const vehicle_id = req.query.id;
  //console.log(building_id)
  const result = await db.query("SELECT * FROM vehicle WHERE vehicle_ID = ?", vehicle_id);
  res.send({
    error: false,
    data: result
  });
});

router.get('/vehicle/getDownloadLinks', async (req, res) => {
  const claimId = req.query.id;
  console.log(claimId)
  const result = await db.query(`select location from (select * from vehicle_claims where
       id = ?) as a inner join photos where vehicleClaimId=id`, claimId);
  res.send({ error: false, data: result })
});

router.get('/getAllPolicies', async (req, res) => {
  const result = await db.query(`select * from policy`);
  res.send({ error: false, data: result });
});

module.exports = router;
