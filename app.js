const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT, MONGO_URL } = require("./config/config");
const productRouter = require("./routes/product.router");
const currencyRouter = require("./routes/currency.router");

const helpers = require("./helpers/helpers");

mongoose.set("strictQuery", false);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", productRouter);
app.use("/", currencyRouter);

app.locals = helpers;

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Unknown error",
    status: err.status || 500,
  });
});

app.listen(PORT, async () => {
  // await mongoose.connect(MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  console.log(`Listen port ${PORT}`);
});

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional, adjust as needed
    });
    console.log("Connected to MongoDB Atlas");

    // You can now define your models and perform database operations here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();
