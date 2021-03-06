'use strict';

const 
    bcrypt = require ('bcrypt-nodejs'),
    users_model = require ('../models/users'),
    joi = require ('joi'),
    jwt = require ('../services/jwt');
;


function RegisterAccount(req, res) {
    
    let params = req.body;

    let usersValue = {};
    usersValue.name = params.name;
    usersValue.fathersurname = params.fathersurname;
    usersValue.mothersurname = params.mothersurname;
    usersValue.email = params.email;
    usersValue.creditcard = params.creditcard;
    usersValue.nip = params.nip;
    usersValue.expiration_date = params.expiration_date;
    usersValue.role = "ROLE_ADMIN";

    if(
        params.name &&
        params.fathersurname &&
        params.mothersurname &&
        params.email &&
        params.creditcard &&
        params.nip &&
        params.expiration_date
    ) {

        if(params.password) {

            bcrypt.hash(params.password, null, null, function(err, hash){
                
                usersValue.password = hash;

                const schema = joi.object().keys({
                    name: joi.string().required().trim().not(null),
                    fathersurname: joi.string().required().trim().not(null),
                    mothersurname: joi.string().required().trim().not(null),
                    creditcard: joi.string().required().trim().not(null),
                    nip: joi.string().required().trim().not(null).length(3),
                    expiration_date: joi.string().required().trim().not(null),
                    email: joi.string().required().trim().not(null).lowercase(),
                    password: joi.string(),
                    role: joi.string(),
                    creation_date: joi.date()
                });

                let { error, value } = schema.validate(usersValue);

                if(error) {
                    console.log(value);
                    console.log(error.details);
                    res.status(500).send({ERROR: error.details[0].message});
                } else {
                    console.log("---> Validaci??n correcta de datos");
                    let users = new users_model(usersValue);
                    users.save((errSave, usersStored) => {
                        if(errSave) {
                            console.log("---> ERROR: El correo ingresado ya est?? en uso");
                            res.status(500).send({ERROR: 'El correo electronico que ingresaste ya esta en uso.'});
                        } else {
                            if(!usersStored) {
                                console.log("---> ERROR: Ha ocurrido un error, por favor intente m??s tarde.");
                                res.status(500).send({ERROR: 'Ha ocurrido un error, por favor intente m??s tarde.'});
                            }
                            else {
                                res.status(200).send({INFO_ACCOUNT: usersStored});
                            }
                        }
                    });
                }

            });

        } else {
            console.log("---> ERROR: Faltan el par??metro de contrase??a y/o el campo esta vac??o.");
            res.status(400).send({ERROR: 'Faltan el par??metro de contrase??a y/o el campo esta vac??o.'});
        }

    } else {
        console.log("---> ERROR: Faltan par??metros en el formulario y/o los campos est??n vac??os.");
        res.status(400).send({ERROR: 'Faltan par??metros en el formulario y/o los campos est??n vac??os.'});
    }

}

function LoginAccount(req, res) {

    let params = req.body;
    let email = params.email;
    let password= params.password;

    if(email && password) {
        
        users_model.findOne({email: email}, (err, users) => {
            if(err) {
                res.status(500).send({ message: 'Tenemos problemas para realizar esta petici??n, intenta m??s tarde'});
                console.log("---> Se encontrar??n problemas a la hora de realizar la petici??n al servidor");
            } else {
                if(!users) {
                    res.status(404).send({ message: 'La cuenta que ingresaste no existe en la plataforma.'});
                    console.log("---> La cuenta ingresada no existe en la plataforma");
                } else {
                    bcrypt.compare(password, users.password, function(err, check){
                        if(check) {
                            if(params.gethash) {
                                console.log("---> Params Get Hash: " + params.gethash);
                                res.status(200).send({token: jwt.createToken(users)});
                            }
                            else {
                                console.log("---> Inicio de sesi??n ");
                                console.log({INFO_ACCOUNT: users});
                                console.log({INFO_ACCOUNT: users.cart});
                                res.status(200).send({INFO_ACCOUNT: users});
                            }
                        } else {
                            res.status(400).send({message: 'Los datos de la cuenta ingresados son incorrectos'});
                            console.log("---> Los datos ingresados de la cuenta son incorrectos");
                        }
                    });
                }
            }
        });

    } else {
        console.log("---> Faltan par??metros en el formulario y/o los campos estan vac??os.");
        res.status(400).send({ message: 'Faltan parametros en el formulario y/o los campos estan vac??os.' });
    }

}

module.exports = {
    LoginAccount,
    RegisterAccount
}