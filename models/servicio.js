import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  orden: { type: Number, required: true }, 
});

const Servicio = mongoose.model('Servicio', servicioSchema);

export default Servicio;