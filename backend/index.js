import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./api/routes/userRoutes.js";
import menuRoutes  from "./api/routes/menuRoutes.js";
import cartRoutes  from "./api/routes/cartRoutes.js";
import paymentRoutes from "./api/routes/paymentRoutes.js";
import dashboardRoutes from "./api/routes/revenuRoutes.js";
import path from "path";
import  jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from 'cors'

dotenv.config();




const __dirname = path.resolve();
const app = express();




// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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


app.use("/users", userRoutes);
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use('/payments', paymentRoutes);
app.use('/dashboard-data', dashboardRoutes);

app.use(express.static(path.join(__dirname, "/Fastfood-App/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Fastfood-App", "dist", "index.html"));
})



// Stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.process.env.STRIPE_SECRET_KEY.paymentIntents.create({
    amount: amount,
    currency: "NGN",
    
    payment_method_types: ["card"],
    
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



// app.get("/", (req, res) => {
//   res.send("Hello Developer AJ!");
// });

app.listen(3000, () => {
  console.log(`server start on Port 3000`);
});