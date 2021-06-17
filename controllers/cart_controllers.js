'use strict'

const cart_model = require ('../models/cart');

function addProduct(req ,res) {
    
    var productCart = new cart_model();

    var params = req.body;

    productCart.product = params.product;

    productCart.save((err, productcartStored) => {
        if(err) {
            res.status(500).send({message: 'Error al realizar esta petición'});
        } else {
            if(!productcartStored) {
                res.status(500).esnd({message: 'Productos no encontrados'});
            } else {
                res.status(200).send({productCart: productcartStored })
            }
        }
    })

}

function getProduct(req, res) {
    var usersId = req.params.id;

    if(!usersId) {
        var find = cart_model.find({});
    } else {
        var find = cart_model.find({products: productId})
    }

}

module.exports = {
    addProduct
}