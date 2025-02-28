import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors"; // Import CORS middleware

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import path from "path";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Set up CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true, // Allow cookies to be sent with requests
//   })
// );



const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  // Serve static files from "backend/dist"
  app.use(express.static(path.join(__dirname, "backend", "dist")));

  // Handle React routing, return index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "backend", "dist", "index.html"));
  });
}


// ROUTING
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.send("we are live");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);

  connectDB();
});
