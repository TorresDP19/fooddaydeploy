'use strict'

const 
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema
;

var ContentSchema = Schema ({
    course: {
        type: Schema.ObjectId, ref: 'Course_Schema'
    },
    module: {
        type: Schema.ObjectId, ref: 'Module_Schema'
    },
    number: {
        type: String,
        required: [true, 'El número es obligatorio.']
    },
    namecontent: {
        type: String,
        required: [true, 'El nombre del contenido es obligatorio']
    },
    link: {
        type: String,
        required: [true, 'El link es requerido']
    },
    files: {
        type: String
    }
});

module.exports = mongoose.model('Content_Schema', ContentSchema);