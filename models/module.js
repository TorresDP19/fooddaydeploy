'use strict'

const 
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema
;

var ModuleSchema = Schema ({
    course: {
        type: Schema.ObjectId, ref: 'Course_Schema',
    },
    module_name: {
        type: String,
        required: [true, 'El nombre del módulo es requirido']
    },
    module_duration: {
        type: String,
        required: [true, 'La duración del módulo es requerida']
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Module_Schema', ModuleSchema);