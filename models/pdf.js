'use strict'

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
;

const PDFSchema = Schema ({
    namePDF: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    files: {
        type: String
    },
    content: {
        type: Schema.ObjectId, ref: 'Content_Schema'
    },
    link: {
        type: String,
    },
    number: {
        type: String
    },
    creationDate: {
        type: Date,
		default: Date.now
    }
});

module.exports = mongoose.model('PDF_Schema', PDFSchema);