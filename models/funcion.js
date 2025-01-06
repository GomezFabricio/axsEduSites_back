import mongoose from 'mongoose';

const funcionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
});

const Funcion = mongoose.model('Funcion', funcionSchema);

export default Funcion;