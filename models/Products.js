const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    price_max: {
        type: Number,
    },
    page_description: {
        type: String,
    },
    page_title: {
        type: String,
    },
    name: {
        type: String,
    },
    price: Number,
    variation_attributes: [
        {
            values: [
                {
                    orderable: Boolean,
                    name: String,
                    value: String,
                },
            ],
            id: String,
            name: String,
        },
    ],
    id: {
        type: String,
    },
    currency: {
        type: String,
    },
    master: {},
    primary_category_id: {
        type: String,
    },
    image_groups: [
        {
            _id: String,
            images: [{ _id: String, alt: String, title: String, link: String }],
            view_type: String,
        },
    ],
    short_description: {
        type: String,
    },
    orderable: {
        type: Boolean,
    },
    variants: [],
    type: {},
    long_description: {
        type: String,
    },
    c_isSale: {
        type: Boolean,
    },
    c_isNewtest: {
        type: Boolean,
    },
    c_isNew: {
        type: Boolean,
    },
    c_tabDescription: {
        type: String,
    },
    page_keywords: {
        type: String,
    },
    c_styleNumber: {
        type: String,
    },
    c_tabDetails: {
        type: String,
    },
    reviews: [
        {
            title: String,
            review: String,
            stars: Number,
            reviewer: String,
        },
    ],
});

module.exports = model("Product", productSchema);
