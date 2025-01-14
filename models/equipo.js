import mongoose from 'mongoose';

const equipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  foto: { type: String, required: true },
  funcion: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcion', required: true },
  descripcion: { type: String, required: true },
  orden_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden' }, // Relación con Orden
});

const Equipo = mongoose.model('Equipo', equipoSchema);

export default Equipo;