const mongoose = require('mongoose');

const questionSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: String
    }],
    sharePermission: {
        type: Boolean,

    }
})

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);


module.exports = QuestionSet;