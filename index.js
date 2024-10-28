const express = require("express");
const mongoose = require("mongoose"); 
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

async function connectToMongoDB(uri) {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectTimeoutMS: 20000 // Optional: Increase timeout if needed
      });
      console.log("MongoDB connected");
  } catch (error) {
      console.error("MongoDB connection error:", error);
  }
}

connectToMongoDB('mongodb://127.0.0.1:27017/qr-links');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
