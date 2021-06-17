'use strict';

const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
;

const QuizSchema = Schema({
    nameQuiz: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    content: {
        type: Schema.ObjectId, ref: 'Content_Schema'
    },
    number: {
        type: String
    },
    link: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz_Schema', QuizSchema);