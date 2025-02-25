const mongoose = require("./config/database");
const Order = require("./models/Order");

async function seedOrders() {
  await Order.deleteMany(); // Өмнөх өгөгдлийг устгах

  await Order.insertMany([
    { customerId: "C001", amount: 500, status: "completed" },
    { customerId: "C002", amount: 300, status: "completed" },
    { customerId: "C001", amount: 700, status: "completed" },
    { customerId: "C003", amount: 100, status: "pending" },
    { customerId: "C002", amount: 600, status: "completed" },
  ]);

  console.log("✅ Dummy Orders Inserted");
  mongoose.connection.close();
}

seedOrders();
