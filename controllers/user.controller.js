import User from '../models/user.js';
import Role from '../models/role.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Traer todos los usuarios activos, incluyendo el rol asociado
    const users = await User.find({ activo: true }).populate('rol_id', 'nombre');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { nombre, email, contraseña, rol_id } = req.body;

  // Validar datos requeridos
  if (!nombre || !email || !contraseña || !rol_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Verificar si el email ya existe
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

    // Verificar si el rol existe
    const existeRol = await Role.findById(rol_id);
    if (!existeRol) {
      return res.status(400).json({ message: 'El rol especificado no existe.' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      contraseña, // Deberías encriptar la contraseña antes de guardarla
      rol_id,
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dar de baja (baja lógica) a un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar y marcar como inactivo
    const usuario = await User.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario desactivado exitosamente.', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, rol_id, activo } = req.body;

  try {
    // Verificar si el rol existe si se está actualizando
    if (rol_id) {
      const existeRol = await Role.findById(rol_id);
      if (!existeRol) {
        return res.status(400).json({ message: 'El rol especificado no existe.' });
      }
    }

    // Actualizar usuario
    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      { nombre, email, contraseña, rol_id, activo },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
