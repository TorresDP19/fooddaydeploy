'use strict'

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
;

const VideoSchema = Schema ({
    nameVideo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    files: {
        type: String
    },
    content: {
        type: Schema.ObjectId, ref: 'Content_Schema'
    },
    number: {
        type: String
    },
    creationDate: {
        type: Date,
		default: Date.now
    }
});

module.exports = mongoose.model('Video_Schema', VideoSchema);