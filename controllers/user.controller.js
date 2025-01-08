import User from '../models/user.js';
import Role from '../models/role.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ activo: true }).populate('rol_id', 'nombre');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { nombre, email, contraseña, rol_id } = req.body;

  if (!nombre || !email || !contraseña || !rol_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const role = await Role.findById(rol_id);
    if (!role) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }

    const newUser = new User({ nombre, email, contraseña, rol_id });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dar de baja (baja lógica) a un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    user.activo = false;
    await user.save();
    res.json({ message: 'Usuario dado de baja.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, rol_id, activo } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (nombre) user.nombre = nombre;
    if (email) user.email = email;
    if (contraseña) user.contraseña = contraseña;
    if (rol_id) user.rol_id = rol_id;
    if (activo !== undefined) user.activo = activo;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};