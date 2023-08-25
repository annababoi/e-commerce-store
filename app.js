const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createSoapClient } = require("./services/soap.client");

const { PORT } = require("./config/config");
const authRouter = require("./routes/auth.router");
const currencyRouter = require("./routes/currency.router");
const productRouter = require("./routes/product.router");
const service = require("./services/mongo.connection");

const helpers = require("./helpers/helpers");

mongoose.set("strictQuery", false);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/auth", authRouter);

app.use("/", productRouter);
app.use("/convert", currencyRouter);

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

service
    .mongoConnection()
    .then(() => {
        return createSoapClient();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error starting the application:", error);
    });
