import { Schema, Document, model } from 'mongoose';

const sobreSchema = new Schema ({

    target: {
        type: String
    },
    source: {
        type: Array
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento',
    }

});

interface ISobre extends Document {
    target: String;
    source: String[];
    evento: String;
}

export const Sobre = model<ISobre>('Sobre', sobreSchema);