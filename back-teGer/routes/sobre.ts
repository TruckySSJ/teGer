import { Router, Response, Request } from "express";
import { Sobre } from '../models/sobre.model';
import bcrypt from 'bcrypt';
import { Evento } from '../models/evento.model';
import eventoRoutes from "./evento";

const sobreRoutes = Router();

//LLenar SObre
sobreRoutes.post('/create', (req: any , res: Response) => {

    const sobre = {
        target: req.body.target,
        evento: req.body.evento,
        source: req.body.source,
        _id: req.body._id
    }


    Sobre.create( sobre ).then( sobreDB => {

        res.json({
            ok: true,
            sobre
            
        });
    
    }).catch(  err =>{
        res.json(err)
    });


});


// Obtener Sobres del EVENTO
sobreRoutes.get('/obtener/:evento', async (req: any, res: Response) => {

    const evento = req.params.evento;

    const sobres = await Sobre.find( { evento: evento } ).sort({ _id: -1 }).exec();


    res.json({
        ok: true,
        sobres
    });

});

//Borrar Sobre
sobreRoutes.post('/borrarSobre', (req: any, res: Response) => {

    const sobre = req.body._id;
    

    Sobre.findOneAndRemove( {_id: sobre} ).then(  eventoDB => {

        res.json({
            ok: true,
            evento: eventoDB
        });
    
    }).catch(  err =>{
        res.json(err)
    });

}); 


export default sobreRoutes;