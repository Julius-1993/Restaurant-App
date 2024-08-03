const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import path from "path";

const __dirname = path.resolve();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/Fastfood-App/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Fastfood-App", "dist", "index.html"));
})

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@magix-food-store.kpqijl4.mongodb.net/?retryWrites=true&w=majority&appName=MAGIX-FOOD-STORE`
  )
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

//Jwt Authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

//   import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const dashboardRoutes = require("./api/routes/revenuRoutes");

app.use("/users", userRoutes);
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use('/payments', paymentRoutes);
app.use('/dashboard-data', dashboardRoutes);
// Stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    
    payment_method_types: ["card"],
    
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.get("/", (req, res) => {
  res.send("Hello Developer AJ!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
