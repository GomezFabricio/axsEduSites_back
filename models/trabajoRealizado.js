import mongoose from 'mongoose';

const trabajoRealizadoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenes: [{ type: String, required: true }], // URLs de las imágenes
  fecha_creacion: { type: Date, default: Date.now, required: true },
  orden_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden' }, // Relación con Orden
});

const TrabajoRealizado = mongoose.model('TrabajoRealizado', trabajoRealizadoSchema);

export default TrabajoRealizado;