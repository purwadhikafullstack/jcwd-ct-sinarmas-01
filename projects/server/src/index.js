require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const { sequelize } = require("./models");
// API Routes
const { 
  authRoutes, 
  addressRoutes, 
  warehouseRoutes, 
  userRoutes,
  productRoutes,
  cartRoutes,
  categoryRoutes,
  checkoutRoutes,
  orderRoutes,
  stockRoutes
} = require("./routes");
const { verifyToken } = require("./middlewares/auth");

const PORT = process.env.PORT || 8000;
const app = express();
sequelize.sync();

app.use(cors({
  origin: process.env.WHITELISTED_DOMAIN
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  return res.status(200).json({
    message: "Hello, Student !",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stock", stockRoutes);


// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send({ message: err.message, error: err });
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));
app.use(express.static("public"));
app.use("/images/payments", verifyToken);

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
