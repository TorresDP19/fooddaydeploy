'use strict'

const 
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema
;

var CourseSchema = Schema ({
    course_name: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },
    duration: {
        type: String,
        required: [true, "La duración del curso es obligatoria"]
    },
    instructor: {
        type: String,
        required: [true, "El nombre del instructor es requerido"]
    },
    modules: {
        type: String,
        required: [true, "El número de módulos es requerido"]
    },
    image: {
        type: String
    },
    creation_date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Course_Schema', CourseSchema);