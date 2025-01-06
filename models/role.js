import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  permisos: [{ type: String }], // Lista de permisos opcionales
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
