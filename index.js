const register = require("./routes/register");
const login = require("./routes/auth");
const brokers = require("./routes/brokers");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
const cors = require("cors");

const port = process.env.port || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/brokers", brokers);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}. . . `);
});
