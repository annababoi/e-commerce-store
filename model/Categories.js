const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categories: [
    {
      image: String,
      name: String,
      page_description: String,
      page_title: String,
      parent_category_id: String,
      c_showInMenu: Boolean,
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
