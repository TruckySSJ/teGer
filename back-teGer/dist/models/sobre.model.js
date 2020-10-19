"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sobreSchema = new mongoose_1.Schema({
    target: {
        type: String
    },
    source: {
        type: Array
    },
    evento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Evento',
    }
});
exports.Sobre = mongoose_1.model('Sobre', sobreSchema);
