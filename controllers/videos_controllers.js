'use strict';

const
    video_schema = require ('../models/video'),
    content_schema = require ('../models/content'),
    joi = require ('joi'),
    path = require ('path'),
    fs = require ('fs')
;

function addVideo(req, res) {
    
    let params = req.body;

    let videoValue = {};
    videoValue.nameVideo = params.nameVideo;
    videoValue.content = params.content;
    videoValue.number = params.number;

    if(
        params.nameVideo &&
        params.content &&
        params.number
    ) {

        const schema = joi.object().keys({
            nameVideo: joi.string().required().not(null),
            content: joi.string().required().not(null),
            number: joi.string().required().not(null)
        });

        let { error, value } = schema.validate(videoValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let video = new video_schema(videoValue);
            video.save((errSave, videoStored) => {
                if(errSave) {
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_VIDEO: videoStored});
                    console.log(`---> El video se creo con éxito: ${videoStored}`);
                }
            });
        }


    } else {
        res.status(500).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log('---> ERROR: Faltan parámetros o campos en el formulario.');
    }

}

function getVideo(req, res) {

    var videoId = req.params.id;

    video_schema.findById(videoId).populate({path: 'content'}).exec((err, video) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!video) {
                console.log('---> ERROR: El video que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El video que intentas buscar no existe.'});
            } else {
                res.status(200).send({video});
                console.log(`---> Video: ${video}`);
            }
        }
    });

}

function getVideos(req, res) {
    var contentId = req.params.content;

    if(!contentId) {
        var find = video_schema.find({}).sort('number');
    } else {
        var find = video_schema.find({content: contentId}).sort('number');
    }

    find.populate({
        path: 'content',
        populate: {
            path: 'module',
            model: 'Module_Schema'
        }
    }).exec(function(err, videos){
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!videos) {
                console.log('---> ERROR: Los videos que intentas buscar no existen.');
                res.status(404).send({message: 'ERROR: Los videos que intentas buscar no existen.'});
            } else {
                res.status(200).send({videos});
                console.log(`---> Lista de videos: ${videos}`);
            }
        }
    });

}

function updateVideo(req, res) {

    var videoId = req.params.id;
    var update = req.body;

    video_schema.findByIdAndUpdate(videoId, update, (err, videoUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!videoUpdate) {
                res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            } else {
                res.status(200).send({video: videoUpdate});
                console.log(`---> El video se actualizo con éxito: ${videoUpdate}`);
            }
        }
    });

}

function uploadFile(req, res) {

    var videoId = req.params.id;
    var file_name = "El archivo aún no se ha subido...";

    if(req.files) {
        var file_path = req.files.files.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'pdf' || file_ext == 'jpg' || file_ext == 'jpge' || file_ext == 'png' || file_ext == 'mkv' || file_ext == 'mp4' || file_ext == 'avi') {

            var query = {_id:videoId};

            video_schema.findByIdAndUpdate(query, {files: file_name}, (err, updateVideo) => {
                if(err) {
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
                } else {
                    if(!updateVideo) {
                        res.status(500).send({message: 'ERROR: El archivo no se pudo actualizar con éxito.'});
                        console.log('---> ERROR: El archivo no se pudo actualizar con éxito.');
                    } else {
                        res.status(200).send({INFO_VIDEO: updateVideo});
                    }
                }
            });

        } else {
            res.status(400).send({message: 'ERROR: La imagen que intentas subir no es compatible.'});
            console.log('---> ERROR: La imagen que intentas subir no es compatible.');
        }

    } else {
        res.status(400).send({message: 'INFO: Aún no han subido video...'})
        console.log('---> INFO: El contenido que seleccionaste aún no tiene video.');
    }

}

function getFile(req, res) {
    
    var videoFile = req.params.videoFile;
    var path_file = './uploads/videos/' + videoFile;
    
    fs.exists(path_file, function(exists){
        if(exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            res.sendFile(path.resolve(path_file));
        }
    });

}

function deleteVideo(req, res) {
    
    var videoId = req.params.id;

    content_schema.findByIdAndRemove(videoId, (err, contentRemoved) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!contentRemoved) {
                res.status(404).send({message: 'ERROR: El contenido no se eliminó correctamente.'});
                console.log("---> ERROR: El contenido no se eliminó correctamente");
            } else {
                video_schema.findByIdAndRemove({content: contentRemoved._id}).remove((err, videoRemoved) => {
                    if(err) {
                        res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                        console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
                    } else {
                        if(!videoRemoved) {
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

module.exports = {
    addVideo,
    getVideo,
    getVideos,
    updateVideo,
    uploadFile,
    getFile,
    deleteVideo
}