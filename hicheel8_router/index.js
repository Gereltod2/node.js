const express = require("express");
const app = express();
const PORT = 5000;

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT} port deer ajillaj baina`);
});
 