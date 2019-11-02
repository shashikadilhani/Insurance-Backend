const register = require("./routes/register");
const login = require("./routes/auth");
const brokers = require("./routes/brokers");
const customers = require("./routes/customers");
const admins = require("./routes/admins.js");
var express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");

var app = express();
const cors = require("cors");

const port = process.env.port || 3001;

app.use(express.static("resources"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/brokers", brokers);
app.use("/api/customers", customers);
app.use("/api/admins", admins);

app.get('/getImage', (req, res) => {
  console.log('download called')
  res.sendFile(req.query.filePath);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}. . . `);
});
