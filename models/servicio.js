import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  orden_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Orden' }, // Relación con Orden
});

const Servicio = mongoose.model('Servicio', servicioSchema);

export default Servicio;