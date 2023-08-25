const mongoose = require("mongoose");

const { MONGO_URL } = require("../config/config");

exports.mongoConnection = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
