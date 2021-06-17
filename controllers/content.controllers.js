'use strict'

const
    content_schema = require ('../models/content'),
    joi = require('joi'),
    fs = require ('fs'),
    path = require ('path')
;

function addContent(req, res) {
    
    let params = req.body;

    let contentValue = {};
    contentValue.course = params.course;
    contentValue.module = params.module;
    contentValue.number = params.number;
    contentValue.namecontent = params.namecontent;
    contentValue.link = params.link;

    if(
        params.course &&
        params.module &&
        params.number &&
        params.namecontent &&
        params.link
    ) {
        
        const schema = joi.object().keys({
            course: joi.string().required().not(null),
            module: joi.string().required().not(null),
            number: joi.string().required().not(null),
            namecontent: joi.string().required().not(null),
            link: joi.string().required().not(null)
        });

        let { error, value } = schema.validate(contentValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let content = new content_schema(contentValue);
            content.save((errSave, contentStored) => {
                if(errSave) {
                    console.log(errSave);
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_CONTENT: contentStored});
                    console.log(`---> El curso se creó con éxito: ${contentStored}`);
                }
            }); 
        }

    } else {
        res.status(500).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log('---> ERROR: Faltan parámetros o campos en el formulario.');
    }

}

function getContent(req, res) {
        
    var contentId = req.params.id;

    content_schema.findById(contentId).populate({path: 'module'}).exec((err, content) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!content) {
                console.log('---> ERROR: El contenido que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El contenido que intentas buscar no existe.'});
            } else {
                res.status(200).send({content});
            }
        }
    });
}

function getContents(req , res) {
    
    var moduleId = req.params.module;

    if(!moduleId) {
        var find = content_schema.find({}).sort('number');
    } else {
        var find = content_schema.find({module: moduleId}).sort('number');
    }

    find.populate({
        path: 'module',
        populate: {
            path: 'course',
            model: 'Course_Schema'
        }
    }).exec(function(err, content) {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!content) {
                res.status(404).send({message: 'INFO: Aún no hay contenido en este módulo'});
                console.log('---> INFO: Aún no hay contenido en este módulo');
            } else {
                res.status(200).send({content});
            }
        }
    });

}

function updateContent(req, res) {
    
    var contentId = req.params.id;
    var update = req.body;

    content_schema.findByIdAndUpdate(contentId, update, (err, contentUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!contentUpdate) {
                console.log('---> ERROR: Se encontraron problemas al realizar los cambios.');
                res.status(404).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
            } else {
                res.status(200).send({content: contentUpdate});
                console.log(`---> El curso se actualizo con éxito: ${contentUpdate}`);
            }
        }
    });

}

function deleteContent(req, res) {

    var contentId = req.params.id;

    content_schema.findByIdAndRemove(contentId, (err, contentRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!contentRemoved) {
                console.log("---> ERROR: El contenido no se pudo eliminar con éxito.");
                res.status(400).send({message: 'ERROR: El contenido no se pudo eliminar con éxito.'});
            } else {
                res.status(200).send({content: contentRemoved});
                console.log(`---> El contenido se eliminó con éxito: ${contentRemoved}`);
            }
        }
    });

}

function uploadFile(req, res) {

    var contentId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.files.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'svg' || file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge' || file_ext == 'pdf' || file_ext == 'mp4') {

            var query = {_id:contentId};

            content_schema.findOneAndUpdate(query, {files: file_name}, (err, updateContent) => {
                if(!updateContent) {
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                }
                else {
                    res.status(200).send({INFO_CONTENT: updateContent});
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }
    } else {
        res.status(404).send({message: 'INFO: Aún no hay imagen en este contenido.'});
        console.log('---> INFO: Aún no hay imagen en este contenido.');
    }

}

function getFiles(req, res) {
    
    var imageFile = req.params.filesFile;
    var path_file = './uploads/files/' + imageFile;
    
    fs.exists(path_file, function(exists){
        if(exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            res.sendFile(path.resolve(path_file));
        }
    });

}

module.exports = {
    addContent,
    getContent,
    getContents,
    updateContent,
    deleteContent,
    uploadFile,
    getFiles
}