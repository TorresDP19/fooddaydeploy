'use strict';

const 
    products_model = require ('../models/products'),
    joi = require ('joi'),
    path = require ('path'),
    fs = require ('fs'),
    mongoosePaginate = require ('mongoose-pagination');
;

function addProduct(req, res) {

    let params = req.body;

    let productsValue = {};

    productsValue.productName = params.productName;
    productsValue.brand = params.brand;
    productsValue.price = params.price;
    productsValue.description = params.description;
    productsValue.material = params.material;
    
    if(
        params.productName &&
        params.brand &&
        params.price &&
        params.description &&
        params.material
    ) {

        const schema = joi.object().keys({
            productName: joi.string().required().trim().not(null),
            brand: joi.string().required().trim().not(null),
            price: joi.string().required().trim().not(null),
            description: joi.string().required().trim().not(null),
            material: joi.string().required().trim().not(null),
            creation_date: joi.date().min("now")
        });

        let { error, value } = schema.validate(productsValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log("---> Validación correcta de datos");
            let products = new products_model(productsValue);
            products.save((errSave, productsStored) => {
                if(errSave) {
                    console.log(errSave);
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_PRODUCT: productsStored});
                    console.log(`---> El producto se creo con éxito: ${productsStored}`);
                }
            });
        }

    } else {
        res.status(400).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log("---> ERROR: Faltan parámetros o campos en el formulario.");
    }

}

function getProduct(req, res) {
    
    var productId = req.params.id;

    products_model.findById(productId, (err, product) => {
        if(err) {
            console.log(err);
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!product) {
                res.status(404).send({message: 'ERROR: El producto que intentas buscar no existe.'});
                console.log("---> ERROR: El producto que intentas buscar no existe.");
            } else {
                res.status(200).send({product});
            }
        }
    });

}

function uploadImage(req, res) {

    var productId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge') {

            var query = {_id:productId};

            products_model.findOneAndUpdate(query, {image: file_name}, (err, updateProduct) => {
                if(!updateProduct) {
                    res.status(500).send({message: 'ERROR: El archivo no se pudo actualizar con éxito.'});
                    console.log('---> ERROR: El archivo no se pudo actualizar con éxito.');
                }
                else {
                    res.status(200).send({INFO_PRODUCT: updateProduct});
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }
    } else {
        res.status(404).send({message: 'INFO: Aún no hay imagen en este producto.'});
        console.log('---> INFO: Aún no hay imagen en este producto.');
    }

}

function updateProduct(req, res) {
    var productId = req.params.id;
    var update = req.body;
    var query = {_id:productId};
    products_model.findOneAndUpdate(query, update, (err, productsUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!productsUpdate) {
                res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios..'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            }
            else {
                res.status(200).send({INFO_PRODUCT: productsUpdate});
                console.log(`---> El producto se actualizo con éxito: ${productsUpdate}`);
            }
        }
    });
}

function deleteProduct(req, res) {

    var productId = req.params.id;

    products_model.findByIdAndRemove(productId, (err, productsRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        }
        else {
            if(!productsRemoved) {
                res.status(404).send({message: 'ERROR: El producto que intentas buscar no existe.'});
                console.log("---> ERROR: El producto que intentas buscar no existe.");
            }
            else {
                res.status(200).send({productsRemoved});
                console.log(`---> El producto se elimino con exito ${productsRemoved}`);
            }
        }
    });

}

function getAllProducts(req, res) {
    var page = req.params.page;
    var itemsPerPage = 50;
    var total = total;

    products_model.find().sort('category').paginate(page, itemsPerPage, function (err, product, total){
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        }
        else {
            if(!product) {
                res.status(404).send({message: 'Los productso a buscar no existen.'});
            }
            else {
                return res.status(200).send({
                    pages: total,
                    total: total,
                    product: product
                });
            }
        }
    });
}

function getImage(req, res) {
    
    var imageFile = req.params.imageFile;
    var path_file = './uploads/products/' + imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            res.status(404).send({message: 'No existe imagen...'});
        }
    });

}

module.exports = {
    addProduct,
    getProduct,
    uploadImage,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getImage
}