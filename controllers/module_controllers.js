'use strict';

const 
    module_schema = require ('../models/module'),
    content_schema = require ('../models/content'),
    joi = require ('joi'),
    jwt = require ('../services/jwt')
;

function addModule(req , res) {
    let params = req.body;

    let moduleValue = {};
    moduleValue.course = params.course;
    moduleValue.module_name = params.module_name;
    moduleValue.module_duration = params.module_duration;

    if(
        params.course &&
        params.module_name &&
        params.module_duration
    ) {

        const schema = joi.object().keys({
            course: joi.string().required().not(null),
            module_name: joi.string().required().not(null),
            module_duration: joi.string().required().not(null)
        });

        let { error, value } = schema.validate(moduleValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let module = new module_schema(moduleValue);
            module.save((errSave, moduleStored) => {
                if(errSave) {
                    res.status(500).send({message: '---> ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_MODULE: moduleStored});
                    console.log(`---> El módulo se creó con exito: ${moduleStored}`);
                }
            });
        }

    } else {
        res.status(500).send({message: 'Error: Faltán parametros en el formulario'});
        console.log('---> Error: Faltán parametros en el formulario.');
    }

}

function getModule(req, res) {
    
    var moduleId = req.params.id;

    module_schema.findById(moduleId).populate({path: 'course'}).exec((err, module) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!module) {
                console.log('---> ERROR: El módulo que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El módulo que intentas buscar no existe.'});
            } else {
                res.status(200).send({module});
            }
        }
    });

}

function getModules(req, res) {

    var courseId = req.params.course;

    if(!courseId) {
        var find = module_schema.find({}).sort('module_name');
    } else {
        var find = module_schema.find({course: courseId}).sort('course_name')
    }

    find.populate({path: 'course'}).exec((err, modules) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!modules) {
                res.status(404).send({message: 'INFO: Aún no hay módulos en este curso.'});
                console.log('---> INFO: Aún no hay módulos en este curso.');
            }
            else {
                res.status(200).send({modules})
            }
        }
    });

}

function updateModule(req, res) {
    
    var moduleId = req.params.id;
    var update = req.body;

    module_schema.findByIdAndUpdate(moduleId, update, (err, moduleUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!moduleUpdate) {
                res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            } else {
                res.status(200).send({module: moduleUpdate});
                console.log(`---> El curso se actualizo con éxito: ${moduleUpdate}`);
            }
        }
    });

}

function deleteModule(req, res) {

    var moduleId = req.params.id;

    module_schema.findByIdAndRemove(moduleId, (err, moduleRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!moduleRemoved) {
                res.status(404).send({message: 'ERROR: El módulo no se pudo eliminar con éxito.'});
                console.log("---> ERROR: El módulo no se pudo eliminar con éxito.");
            } else {
                content_schema.find({module: moduleRemoved._id}).remove((err, contentRemoved) => {
                    if(err) {
                        res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                        console.log("----> ERROR: Se encontraron problemas al realizar está petición.");
                    } else {
                        if(!contentRemoved) {
                            res.status(404).send({message: 'ERROR: El contenido no se pudo eliminar con éxito.'});
                            console.log("---> ERROR: El contenido no se pudo eliminar con éxito.");
                        } else {
                            res.status(200).send({module: moduleRemoved});
                            console.log(`---> El curso se eliminó con éxito: ${moduleRemoved}`);
                        }
                    }
                });
            }
        }
    });

}

function uploadImage(req, res) {
    
    var moduleId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge') {
            var query = {_id:moduleId};

            module_schema.findByIdAndUpdate(query, {image: file_name}, (err, updateModule) => {
                if(!updateModule) {
                    res.status(500).send({message: 'ERROR: El archivo no se pudo actualizar con éxito.'});
                    console.log('---> ERROR: El archivo no se pudo actualizar con éxito.');
                }
                else {
                    res.status(200).send({INFO_MODULE: updateModule});
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }

    } else {
        res.status(400).send({message: 'INFO: Aún no han subido imagen en este módulo...'})
        console.log('---> INFO: El curso que seleccionaste aún no tiene imagen.');
    }

}

module.exports = {
    addModule,
    getModule,
    getModules,
    updateModule,
    deleteModule,
    uploadImage
}