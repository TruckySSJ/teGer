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
const autenticacion_1 = require("../middlewares/autenticacion");
const evento_model_1 = require("../models/evento.model");
const eventoRoutes = express_1.Router();
//Obtener Eventos Paginados
eventoRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.usuario._id;
    /* let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10; */
    const eventos = yield evento_model_1.Evento.find({ usuario: usuario }).sort({ _id: -1 }) /* .skip(skip).limit(10) */.populate('usuario', '-password').exec();
    res.json({
        ok: true,
        /* pagina, */
        eventos,
        usuario
    });
}));
//Crear Evento
eventoRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    evento_model_1.Evento.create(body).then((eventoDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield eventoDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            evento: eventoDB
        });
    })).catch(err => {
        res.json(err);
    });
});
/*  //Agregar sobre a la votacion
eventoRoutes.post('/addSobre',async (req: any , res: Response) => {

    const sobre = {
        target: req.body.target,
        evento: req.body.evento,
        source: req.body.source,
        _id: ""
    }

    const idSobre = await Sobre.find( { evento: sobre.evento, target: sobre.target } ).exec();

    const sobreSolido = idSobre;

    Evento.findByIdAndUpdate(sobre.evento,
        { $Push: {votaciones: sobreSolido } },
        { new: true, upsert: true },
         function (err, model) {
            console.log(err);
        }
    ).then (eventoDB => {
        res.json({
            ok: true,
            evento: eventoDB
        });
    }).catch(  err =>{
        res.json(err)
    });

});
 */
//Borrar Evento
eventoRoutes.post('/borrarEvento', [autenticacion_1.verificaToken], (req, res) => {
    const evento = req.body._id;
    evento_model_1.Evento.findOneAndRemove({ _id: evento }).then(eventoDB => {
        res.json({
            ok: true,
            evento: eventoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Unirse a Evento
eventoRoutes.post('/unirseEvento', (req, res) => {
    const evento = req.body._id;
    evento_model_1.Evento.findById(evento).then(eventoDB => {
        res.json({
            ok: true,
            evento: eventoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
exports.default = eventoRoutes;
