import mongoose from 'mongoose';

const auditoriaSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accion: { type: String, required: true },
  fecha: { type: Date, default: Date.now, required: true },
  entidad_afectada: { type: String, required: true },
  id_entidad_afectada: { type: mongoose.Schema.Types.ObjectId, required: true },
  cambios: {
    antes: { type: Map, of: String, required: true },
    despues: { type: Map, of: String, required: true },
  },
});

const Auditoria = mongoose.model('Auditoria', auditoriaSchema);

export default Auditoria;