"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventoSchema = new mongoose_1.Schema({
    created: {
        type: Date,
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    pregunta: {
        type: String,
        required: [true, 'La pregunta es necesaria']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    } /* ,
    votaciones: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Sobre'
        }
    ] */
});
eventoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Evento = mongoose_1.model('Evento', eventoSchema);
