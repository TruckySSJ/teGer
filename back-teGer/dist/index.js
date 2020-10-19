"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const evento_1 = __importDefault(require("./routes/evento"));
const cors_1 = __importDefault(require("cors"));
const sobre_1 = __importDefault(require("./routes/sobre"));
const server = new server_1.default();
//Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/eventos', evento_1.default);
server.app.use('/sobre', sobre_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/teger', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
