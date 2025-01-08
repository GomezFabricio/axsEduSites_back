import Role from '../models/role.js';

// Obtener todos los roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  const { nombre, permisos } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre del rol es obligatorio.' });
  }

  try {
    const newRole = new Role({ nombre, permisos });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un rol
export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre, permisos } = req.body;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    if (nombre) role.nombre = nombre;
    if (permisos) role.permisos = permisos;

    await role.save();
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    await role.remove();
    res.json({ message: 'Rol eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};