'use strict'

const 
    course_model = require ('../models/course'),
    module_model = require ('../models/module'),
    content_model = require ('../models/content'),
    video_model = require ('../models/video'),
    pdf_model = require ('../models/pdf'),
    Joi = require ('joi'),
    jwt = require ('../services/jwt'),
    mongoosePaginate = require ('mongoose-paginate'),
    fs = require ('fs'),
    path = require ('path')
;

function addCourse(req, res) {
    
    let params = req.body;

    let courseValue = {};
    courseValue.course_name = params.course_name;
    courseValue.duration = params.duration;
    courseValue.instructor = params.instructor;
    courseValue.modules = params.modules;

    if(
        params.course_name &&
        params.duration &&
        params.instructor &&
        params.modules
    ) {

        const schema = Joi.object().keys({
            course_name: Joi.string().required().not(null),
            duration: Joi.string().required().not(null),
            instructor: Joi.string().required().not(null),
            modules: Joi.string().required().not(null),
            creation_date: Joi.date().min("now")
        });

        let { error, value } = schema.validate(courseValue);
        
        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let course = new course_model(courseValue);
            course.save((errSave, courseSave) => {
                if(errSave) {
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                } else {
                    res.status(200).send({INFO_COURSE: courseSave});
                    console.log(`---> El curso se creo con éxito: ${courseSave}`);
                }
            });
        }


    } else {
        res.status(500).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log('---> ERROR: Faltan parámetros o campos en el formulario.');
    }

}

function getCourse(req, res) {
    
    var courseId = req.params.id;

    course_model.findById(courseId, (err, course) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('E---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!course) {
                console.log('---> ERROR: El curso que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El X que intentas buscar no existe.'});
            } else {
                res.status(200).send({course});
            }
        }
    });

}

function getCourses(req , res) {

    var page = req.params.page;
    var itemsPerPage = 50;

    course_model.find().sort('course_name').paginate(page, itemsPerPage, function(err, courses, total) {
        if(err) {
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
        } else {
            if(!courses) {
                console.log('---> ERROR: El curso que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El curso que intentas buscar no existe.'});
            } else {
                return res.status(200).send({
                    pages: total,
                    courses: courses
                });
            }
        }
    });

}

function updateCourse(req , res) {
    var courseId = req.params.id;
    var update = req.body;
    var query = {_id:courseId};

    course_model.findByIdAndUpdate(query, update, (err, courseUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!courseUpdate) {
                res.status(404).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            }
            else {
                res.status(200).send({INFO_COURSE: courseUpdate});
                console.log(`---> El curso se actualizo con exito: ${courseUpdate}`);
            }
        }
    });

}

function deleteCourse(req, res) {

    var courseId = req.params.id;
    
    course_model.findByIdAndRemove(courseId, (err, courseRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!courseRemoved) {
                res.status(404).send({message: 'ERROR: El curso que intentas buscar no existe.'});
                console.log("---> ERROR: El curso que intentas buscar no existe.");
            } else {
                module_model.find({course: courseRemoved._id}).remove((err, moduleRemoved) => {
                    if(err) {
                        res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                        console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
                    } else {
                        if(!moduleRemoved) {
                            res.status(404).send({message: 'ERROR: El módulo que intentas buscar no existe.'});
                            console.log("---> ERROR: El módulo que intentas buscar no existe.");
                        } else {
                            content_model.find({module: moduleRemoved._id}).remove((err, contentRemoved) => {
                                if(err) {
                                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                                    console.log("----> ERROR: Se encontraron problemas al realizar está petición.");
                                } else {
                                    if(!contentRemoved) {
                                        res.status(404).send({message: 'ERROR: El contenido no se pudo eliminar con éxito.'});
                                        console.log("---> ERROR: El contenido no se pudo eliminar con éxito.");
                                    } else {
                                        res.status(200).send({courseRemoved});
                                        console.log(`---> El curso se eliminó con éxito: ${courseRemoved}`);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }); 


}

function uploadImage(req, res) {
    
    var courseId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpge') {
            var query = {_id:courseId};

            course_model.findByIdAndUpdate(query, {image: file_name}, (err, updateCourse) => {
                if(!updateCourse) {
                    res.status(500).send({message: 'ERROR: El archivo no se pudo actualizar con éxito.'});
                    console.log('---> ERROR: El archivo no se pudo actualizar con éxito.');
                }
                else {
                    res.status(200).send({INFO_COURSE: updateCourse});
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }

    } else {
        res.status(400).send({message: 'INFO: Aún no han subido imagen en este curso...'})
        console.log('---> INFO: El curso que seleccionaste aún no tiene imagen.');
    }

}

function getImage(req, res) {
    
    var imageFile = req.params.imageFile;
    var path_file = './uploads/products/' + imageFile;
    
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
    addCourse,
    getCourse,
    getCourses,
    uploadImage,
    updateCourse,
    deleteCourse,
    getImage
}