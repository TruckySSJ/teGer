"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sobre_model_1 = require("../models/sobre.model");
const sobreRoutes = express_1.Router();
//LLenar SObre
sobreRoutes.post('/create', (req, res) => {
    const sobre = {
        target: req.body.target,
        evento: req.body.evento,
        source: req.body.source,
        _id: req.body._id
    };
    sobre_model_1.Sobre.create(sobre).then(sobreDB => {
        res.json({
            ok: true,
            sobre
        });
    }).catch(err => {
        res.json(err);
    });
});
// Obtener Sobres del EVENTO
sobreRoutes.get('/obtener/:evento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = req.params.evento;
    const sobres = yield sobre_model_1.Sobre.find({ evento: evento }).sort({ _id: -1 }).exec();
    res.json({
        ok: true,
        sobres
    });
}));
//Borrar Sobre
sobreRoutes.post('/borrarSobre', (req, res) => {
    const sobre = req.body._id;
    sobre_model_1.Sobre.findOneAndRemove({ _id: sobre }).then(eventoDB => {
        res.json({
            ok: true,
            evento: eventoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
exports.default = sobreRoutes;
