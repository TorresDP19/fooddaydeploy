'use strict';

const 
    quiz_schema = require ('../models/quiz'),
    content_schema = require ('../models/content'),
    joi = require ('joi'),
    path = require ('path'),
    fs = require ('fs')
;

function addQuiz(req, res) {
    let params = req.body;

    let quizValue = {};
    quizValue.nameQuiz = params.nameQuiz;
    quizValue.number = params.number;
    quizValue.link = params.link;
    quizValue.content = params.content;

    if(
        params.nameQuiz &&
        params.number &&
        params.link &&
        params.content
    ) {

        const schema = joi.object().keys({
            nameQuiz: joi.string().required().not(null),
            number: joi.string().required().not(null),
            content: joi.string().required().not(null),
            link: joi.string().required().not(null),
        });

        let { error, value } = schema.validate(quizValue);

        if(error) {
            console.log(value);
            console.log(error.details);
            res.status(400).send({ERROR: error.details[0].message});
        } else {
            console.log('---> Validación correcta de datos');
            let quiz = new quiz_schema(quizValue);
            quiz.save((errSave, quizStored) => {
                if(errSave) {
                    console.log(errSave);
                    res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
                    console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
                } else {
                    res.status(200).send({INFO_QUIZ: quizStored});
                    console.log(`---> El examen se creo con éxito: ${quizStored}`);
                }
            });
        }

    } else {
        res.status(500).send({message: 'ERROR: Faltan parámetros o campos en el formulario.'});
        console.log('---> ERROR: Faltan parámetros o campos en el formulario.');
    }

}

function getQuiz(req, res) {
    
    var quizId = req.params.id;

    quiz_schema.findById(quizId).populate({path: 'content'}).exec((err, quiz) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!quiz) {
                console.log('---> ERROR: El examen que intentas buscar no existe.');
                res.status(404).send({message: 'ERROR: El examen que intentas buscar no existe.'});
            } else {
                res.status(200).send({quiz});
                console.log(`---> Examen: ${quiz}`);
            }
        }
    });

}

function getQuizs(req, res) {

    var contentId = req.params.content;

    if(!contentId) {
        var find = quiz_schema.find({}).sort('number');
    } else {
        var find = quiz_schema.find({content: contentId}).sort('number');
    }

    find.populate({
        path: 'content',
        populate: {
            path: 'module',
            model: 'Module_Schema'
        }
    }).exec(function(err, quizzes){
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log('---> ERROR: Se encontraron problemas al realizar está petición.');
        } else {
            if(!quizzes) {
                console.log('---> ERROR: Los examenes que intentas buscar no existen.');
                res.status(404).send({message: 'ERROR: Los examenes que intentas buscar no existen.'});
            } else {
                res.status(200).send({quizzes});
                console.log(`---> Lista de examenes: ${quizzes}`);
            }
        }
    });

}

function updateQuiz(req, res) {
    
    var quizId = req.params.id;
    var update = req.body;

    quiz_schema.findByIdAndUpdate(quizId, update, (err, quizUpdate) => {
        if(err) {
            res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar está petición.'});
            console.log("---> ERROR: Se encontraron problemas al realizar está petición.");
        } else {
            if(!quizUpdate) {
                res.status(500).send({message: 'ERROR: Se encontraron problemas al realizar los cambios.'});
                console.log("---> ERROR: Se encontraron problemas al realizar los cambios.");
            } else {
                res.status(200).send({quiz: quizUpdate});
                console.log(`---> El examen se actualizo con éxito: ${quizUpdate}`);
            }
        }
    });

}

module.exports = {
    addQuiz,
    getQuiz,
    getQuizs,
    updateQuiz
}