'use strict'

const
    pdfs_schema = require ('../models/pdf'),
    content_schema = require ('../models/content'),
    joi = require ('joi'),
    fs = require ('fs'),
    path = require ('path')
;

function addPDF(req, res) {

    let params = req.body;

    let pdfValue = {};
    pdfValue.namePDF = params.namePDF;
    pdfValue.content = params.content;
    pdfValue.number = params.number;

    if(
        params.namePDF &&
        params.content &&
        params.number
    ) {

        const schema = joi.object().keys({
            namePDF: joi.string().required().not(null),
            content: joi.string().required().not(null),
            link: joi.string().not(null),
            number: joi.string().not(null).required()
        });

        let { error, value } = schema.validate(pdfValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let pdf = new pdfs_schema(pdfValue);
            pdf.save((errSave, pdfStored) => {
                if(errSave) {
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_PDF: pdfStored});
                    console.log(`---> El PDF se creó con éxito: ${pdfStored}`);
                }
            });
        }


    } else {
        res.status(500).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log('---> ERROR: Faltan parámetros o campos en el formulario.');
    }

}

function getPDF(req, res) {
    var pdfId = req.params.id;

    pdfs_schema.findById(pdfId).populate({path: 'content'}).exec((err, pdf) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!pdf) {
                console.log('---> ERROR: El PDF que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El PDF que intentas buscar no existe.'});
            } else {
                res.status(200).send({pdf});
                console.log(`---> PDF: ${pdf}`);
            }
        }
    });

}

function getPDFs(req, res) {
    var contentId = req.params.content;

    if(!contentId) {
        var find = pdfs_schema.find({}).sort('number');
    } else {
        var find = pdfs_schema.find({content: contentId}).sort('number');
    }

    find.populate({
        path: 'content',
        populate: {
            path: 'module',
            model: 'Module_Schema'
        }
    }).exec(function(err, pdfs) {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!pdfs) {
                console.log('---> ERROR: Los PDFs que intentas buscar no existen.');
                res.status(404).send({message: 'ERROR: Los PDFs que intentas buscar no existen.'});
            } else {
                res.status(200).send({pdfs});
                console.log(`---> Lista de PDFs: ${pdfs}`);
            }
        }
    });
}

function updatePDF(req, res) {
    
    var pdfId = req.params.id;
    var update = req.body;

    pdfs_schema.findByIdAndUpdate(pdfId, update, (err, pdfUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!pdfUpdate) {
                res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            } else {
                res.status(200).send({pdf: pdfUpdate});
                console.log(`---> El curso se actualizo con éxito: ${pdfUpdate}`);
            }
        }
    });

}

function deletePDF(req, res) {
    
    var pdfId = req.params.id;

    content_schema.findByIdAndRemove(pdfId, (err, contentRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!contentRemoved) {
                res.status(404).send({message: 'ERROR: El contenido no se eliminó correctamente.'});
                console.log("---> ERROR: El contenido no se eliminó correctamente");
            } else {
                pdfs_schema.findByIdAndRemove({content: contentRemoved._id}).remove((err, pdfRemoved) => {
                    if(err) {
                        res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                        console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
                    } else {
                        if(!pdfRemoved) {
                            res.status(404).send({message: 'ERROR: El PDF no se pudo eliminar con éxito.'});
                            console.log("---> ERROR: El PDF no se pudo eliminar con éxito.");
                        } else {
                            res.status(200).send({content: contentRemoved});
                            console.log(`---> El curso se eliminó con éxito: ${contentRemoved}`);
                        }
                    }
                });
            }
        }
    });

}

function uploadFile(req, res) {
    
    var pdfId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.files.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'pdf' || file_ext == 'jpg' || file_ext == 'jpge' || file_ext == 'png' || file_ext == 'txt' || file_ext == 'docx') {

            var query = {_id:pdfId};

            pdfs_schema.findByIdAndUpdate(query, {files: file_name}, (err, updatePDF) => {
                if(err) {
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
                } else {
                    if(!updatePDF) {
                        res.status(500).send({message: 'ERROR: El archivo no se pudo actualizar con éxito.'});
                        console.log('---> ERROR: El archivo no se pudo actualizar con éxito.');
                    } else {
                        res.status(200).send({INFO_PDF: updatePDF});
                    }
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }

    } else {
        res.status(400).send({message: 'INFO: Aún no han subido PDF en este contenido...'})
        console.log('---> INFO: El contenid que seleccionaste aún no tiene PDF.');
    }
}

function getPDFView(req, res) {
    
    var pdfFile = req.params.pdfFile;
    var path_file = './uploads/files/' + pdfFile;
    
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
    addPDF,
    getPDF,
    getPDFs,
    updatePDF,
    deletePDF,
    uploadFile,
    getPDFView
}