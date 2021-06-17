'use strict';

const 
    jwt = require ('jwt-simple'),
    moment = require ('moment'),
    config = require ('../config')
;

exports.ensureAuth = function(req, res, next ) {
    if(!req.headers.authorization) {
        return res.status(403).send({message: '[ERROR] Esta petición debe tener una cabezera de autenticación.'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        if(payload.exp <= moment().unix()) {
            res.status(401).send({message: '[ERROR] El token ya esta expirado.'});
        }
    } catch (ex) {
        console.log(ex);
        res.status(404).send({message: '[ERROR] El token ingresado no es valido'});
    }

    req.users = payload;

    next();

};
