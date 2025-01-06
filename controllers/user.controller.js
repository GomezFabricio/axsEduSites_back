import User from '../models/User.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Traer todos los usuarios, incluyendo el rol asociado
    const users = await User.find().populate('rol_id', 'nombre'); 
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
