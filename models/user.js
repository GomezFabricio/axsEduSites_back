import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' },
  }
);

const User = mongoose.model('User', userSchema);

export default User;
