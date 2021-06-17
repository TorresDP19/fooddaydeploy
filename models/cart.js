'use strict';

var
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema
;

var CartSchema = Schema ({
    product: {
        type: Schema.ObjectId,
        ref:  'Products_Schema' 
    }
});

module.exports = mongoose.model('Cart_Schema', CartSchema);