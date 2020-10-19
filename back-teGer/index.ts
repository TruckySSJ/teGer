import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import eventoRoutes from './routes/evento';
import cors from 'cors';
import sobreRoutes from './routes/sobre';

const server = new Server();

//Configurar CORS
server.app.use( cors({ origin: true, credentials: true  }) );

//Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/eventos', eventoRoutes);
server.app.use('/sobre', sobreRoutes);

//Conectar DB
mongoose.connect('mongodb://localhost:27017/teger',
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {
    if ( err ) throw err;

    console.log('Base de datos ONLINE');
})

//Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});