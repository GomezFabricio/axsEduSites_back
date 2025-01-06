import mongoose from 'mongoose';

const tipoSeccionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  campos_personalizados: [{ type: String, required: true }],
});

const TipoSeccion = mongoose.model('TipoSeccion', tipoSeccionSchema);

export default TipoSeccion;