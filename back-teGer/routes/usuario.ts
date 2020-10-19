import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//Login
userRoutes.post('/login', ( req: Request, res: Response ) => {

    const body = req.body;

    Usuario.findOne({ email: body.email }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario / Contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellido: userDB.apellido,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,   
                token: tokenUser
            });

        }else {
            return res.json({
                ok: false,
                mensaje: 'Usuario / Contraseña no son correctos'
            });
        }

    })

})

// Crear Usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,   
            token: tokenUser
        });

    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });

});

//Actualizar usuario
userRoutes.post('/update', verificaToken,( req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) =>{

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,   
            token: tokenUser
        });

    });

});

userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) =>{ // AQUI OBTENGO TODA LA INFO DEL USUARIO

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});


//Actualizar PASSWORD
userRoutes.post('/updatePass', verificaToken,( req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        email: req.body.email || req.usuario.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) =>{

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,   
            token: tokenUser
        });

    });

});

export default userRoutes;