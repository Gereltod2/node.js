const express = require("express");
const mongoose = require("./config/database");
const cors = require("cors");
require("dotenv").config();

const ordersRoute = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", ordersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
