const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5555;
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const userRoutes = require("./routes/userRoutes");
const gigRoutes = require("./routes/gigRoutes");
const cookieParser = require("cookie-parser");
const reviewRoutes = require("./routes/reviewRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const conversationRoutes = require("./routes/conversationRoute");
const messageRoutes = require("./routes/messageRoutes");
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL,
    // pass cookies
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  console.log("hello");
});

app.listen(PORT, (req, res) => {
  console.log(`server connect to ${PORT}`);
});
