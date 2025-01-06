import mongoose from 'mongoose';

const seccionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo_seccion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoSeccion', required: true },
  contenido: { type: Map, of: String, required: true },
  orden: { type: Number, required: true },
});

const Seccion = mongoose.model('Seccion', seccionSchema);

export default Seccion;