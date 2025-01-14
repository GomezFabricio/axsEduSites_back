import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema({
  ordenGeneral: { type: Number, required: true },
  ordenIndividual: { type: Number, required: true },
});

const Orden = mongoose.model('Orden', ordenSchema);

export default Orden;