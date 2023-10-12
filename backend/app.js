const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

//Route Imports
const auth = require("./routes/auth.routes");
const item = require("./routes/inventory.routes");
const sale = require("./routes/sale.routes");

app.get("/", (req, res) => {
  res.send("Inventory Management");
});

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use("/api/v1", auth);
app.use("/api/v1", item);
app.use("/api/v1", sale);

module.exports = app;
