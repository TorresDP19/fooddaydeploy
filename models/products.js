'use strict';

const 
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema
;

const ProductsSchema = Schema ({
    productName: {
        type: String,
        trim: true,
        required: [true, "El nombre del producto es obligatorio"]
    },
    brand: {
        type: String,
        trim: true,
        required: [true, "La marca del producto es obligatorio"]
    },
    price: {
        type: String,
        trim: true,
        required: [true, "El precio del producto es obligatorio"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "El nombre del producto es obligatorio"]
    },
    material: {
        type: String,
        trim: true,
        required: [true, "El nombre del producto es obligatorio"]
    },
    image: {
        type: String,
    },
    creation_date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Products_Schema', ProductsSchema);