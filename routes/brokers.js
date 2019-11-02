const express = require("express");
const router = express.Router();
var connection = require("./config");
const db = require("../db");

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

  connection.query("SELECT * FROM users WHERE email = ?", [email], function(
    err,
    result
  ) {
    if (result.length > 0) {
      res.send({
        message: "user already registered for this email"
      });
    } else {
      connection.query("INSERT INTO users SET ?", users, function(
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
  REQUEST_ID,vehicle_id,building_id,customer_acceptance,policy_status FROM (SELECT * FROM customer_request WHERE broker_id='${brokerId}' and is_Accepted=1) 
  AS a INNER JOIN users WHERE a.customer_id=users.user_id`);
  console.log(result)
  res.send(result);
});

router.get('/sendPolicy', async (req, res) => {
  const quotationId = req.query.id;
  console.log(quotationId)
  const result = await db.query(`update customer_request set policy_status=1 where Request_ID=?`, quotationId);
  res.send({ error: false, data:result });
});

router.get('/acceptQuotation', async (req, res) => {
  const quotationId = req.query.id;
  console.log(quotationId)
  const result = await db.query(`update customer_request set is_Accepted=1 where Request_ID=?`, quotationId);
  res.send({ error: false, data:result });
});

router.get('/rejectQuotation', async (req, res) => {
  const quotationId = req.query.id;
  console.log(quotationId)
  const result = await db.query(`update customer_request set is_Accepted=2 where Request_ID=?`, quotationId);
  res.send({ error: false, data:result });
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

module.exports = router;
