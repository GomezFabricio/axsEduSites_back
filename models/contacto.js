import mongoose from 'mongoose';

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha_envio: { type: Date, default: Date.now, required: true },
});

const Contacto = mongoose.model('Contacto', contactoSchema);

export default Contacto;