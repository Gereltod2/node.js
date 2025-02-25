const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Захиалгуудыг агрегат хийх
router.get("/aggregate", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { 
          _id: "$customerId", 
          totalSpent: { $sum: "$amount" }, 
          avgSpent: { $avg: "$amount" } 
      }},
      { $sort: { totalSpent: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
