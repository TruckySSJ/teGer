import { Router, Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Evento } from '../models/evento.model';
import { Sobre } from '../models/sobre.model';


const eventoRoutes = Router();

//Obtener Eventos Paginados
eventoRoutes.get('/', [verificaToken], async (req: any, res: Response) => {

    const usuario = req.usuario._id;

    /* let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10; */

    const eventos = await Evento.find( { usuario: usuario } ).sort({ _id: -1 })/* .skip(skip).limit(10) */.populate('usuario', '-password').exec();


    res.json({
        ok: true,
        /* pagina, */
        eventos,
        usuario
    });

});

//Crear Evento
eventoRoutes.post('/', [verificaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Evento.create( body ).then( async eventoDB => {

        await eventoDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            evento: eventoDB
        });
    
    }).catch(  err =>{
        res.json(err)
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
eventoRoutes.post('/borrarEvento', [verificaToken], (req: any, res: Response) => {

    const evento = req.body._id;
    

    Evento.findOneAndRemove( {_id: evento} ).then(  eventoDB => {

        res.json({
            ok: true,
            evento: eventoDB
        });
    
    }).catch(  err =>{
        res.json(err)
    });

}); 


//Unirse a Evento

eventoRoutes.post('/unirseEvento', (req: any, res: Response) => {

    const evento = req.body._id;
    
    Evento.findById( evento ).then(  eventoDB => {

        res.json({
            ok: true,
            evento: eventoDB
        });
    
    }).catch(  err =>{
        res.json(err)
    });

}); 




export default eventoRoutes;