const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Categories = require("../models/Categories");
const Products = require("../models/Products");

const User = require("../models/User");
const Tokens = require("../models/Tokens");
const { ACCESS_SECRET, REFRESH_SECRET } = require("../config/config");

async function getAllCategories() {
    return await Categories.find({});
}

async function getCategoryById(id) {
    return await Categories.findOne({ id });
}

async function getProductsBySubCategory(subCategoryId, page = 1, perPage = 8) {
    const skip = (page - 1) * perPage;
    const productRespose = await Products.find({
        primary_category_id: subCategoryId,
    })
        .skip(skip)
        .limit(perPage);

    const productsCount = await Products.countDocuments({
        primary_category_id: subCategoryId,
    });
    const totalPages = Math.ceil(productsCount / perPage);

    return { productRespose, totalPages };
}

async function getProductById(id) {
    return await Products.findOne({ id });
}

// auth utills
async function createUser({ email, name, age, password, phone }) {
    const hashPassword = await bcrypt.hash(password, 10);
    return await User.create({
        name,
        age,
        email,
        phone,
        password: hashPassword,
    });
}

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function createTokens(userId) {
    const accessToken = jwt.sign({ id: userId }, ACCESS_SECRET, {
        expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, {
        expiresIn: "30d",
    });

    return await Tokens.create({ accessToken, refreshToken, _user_id: userId });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getProductsBySubCategory,
    getProductById,
    createUser,
    findUserByEmail,
    createTokens,
};
