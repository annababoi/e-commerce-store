const mongoose = require("mongoose");
const subCategories = new mongoose.Schema({
    id: String,
    image: String,
    name: String,
    page_description: String,
    page_title: String,
    parent_category_id: String,
    c_showInMenu: Boolean,
});

const categoriesSchema = new mongoose.Schema({
    categories: [
        {
            image: String,
            name: String,
            page_description: String,
            page_title: String,
            parent_category_id: String,
            c_showInMenu: Boolean,
            categories: [subCategories],
        },
    ],
    id: String,
    image: String,
    name: String,
    page_description: String,
    page_title: String,
    parent_category_id: String,
    c_showInMenu: Boolean,
});

module.exports = mongoose.model("Categories", categoriesSchema);
