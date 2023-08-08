const express = require("express");
const mongoose = require("mongoose");

const { PORT, MONGO_URL } = require("./config/config");
const categoryRouter = require("./routes/category.router");

mongoose.set("strictQuery", false);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", categoryRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Unknown error",
    status: err.status || 500,
  });
});

app.listen(PORT, async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Listen port ${PORT}`);
});
