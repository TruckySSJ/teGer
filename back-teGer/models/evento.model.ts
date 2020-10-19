import { Schema, Document, model } from 'mongoose';

const eventoSchema = new Schema({

    created: {
        type: Date,
        //default: Date.now
    },
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    pregunta: {
        type: String,
        required: [ true, 'La pregunta es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }/* ,
    votaciones: [
        {
            type:Schema.Types.ObjectId, 
            ref: 'Sobre'
        }
    ] */

});

eventoSchema.pre<IEvento>('save', function( next ) {
    this.created = new Date();
    next();
});

interface IEvento extends Document {
    created: Date;
    nombre: String;
    usuario: String;
    /* votaciones: String[]; */
}

export const Evento = model<IEvento>('Evento', eventoSchema);