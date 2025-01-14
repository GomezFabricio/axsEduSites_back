import mongoose from 'mongoose';

const trabajoRealizadoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: [{ type: String, required: true }],
  fecha_creacion: { type: Date, default: Date.now, required: true },
});

const TrabajoRealizado = mongoose.model('TrabajoRealizado', trabajoRealizadoSchema);

export default TrabajoRealizado;