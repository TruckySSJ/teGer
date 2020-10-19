"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sobreSchema = new mongoose_1.Schema({
    target: {
        type: String
    },
    source: {
        type: Array
    }
});
/* interface IVotacion extends Document {
    sobre: Date;
    nombre: String;
    usuario: String;
} */
exports.Sobre = mongoose_1.model('Sobre', sobreSchema);
