const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({// Esquema para que funcione de manera interna
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('tasks', TaskSchema);//Se ecporta a la coleccion llamada 'tasks'