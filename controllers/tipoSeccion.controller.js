import TipoSeccion from '../models/tipoSeccion.js';

// Obtener todos los tipos de secciones
export const getTiposSeccion = async (req, res) => {
  try {
    const tiposSeccion = await TipoSeccion.find();
    res.json(tiposSeccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo tipo de sección
export const createTipoSeccion = async (req, res) => {
  const { nombre, campos_personalizados } = req.body;

  if (!nombre || !campos_personalizados) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newTipoSeccion = new TipoSeccion({ nombre, campos_personalizados });
    await newTipoSeccion.save();
    res.status(201).json(newTipoSeccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un tipo de sección
export const updateTipoSeccion = async (req, res) => {
  const { id } = req.params;
  const { nombre, campos_personalizados } = req.body;

  try {
    const tipoSeccion = await TipoSeccion.findById(id);
    if (!tipoSeccion) {
      return res.status(404).json({ message: 'Tipo de sección no encontrado.' });
    }

    if (nombre) tipoSeccion.nombre = nombre;
    if (campos_personalizados) tipoSeccion.campos_personalizados = campos_personalizados;

    await tipoSeccion.save();
    res.json(tipoSeccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un tipo de sección
export const deleteTipoSeccion = async (req, res) => {
  const { id } = req.params;

  try {
    const tipoSeccion = await TipoSeccion.findById(id);
    if (!tipoSeccion) {
      return res.status(404).json({ message: 'Tipo de sección no encontrado.' });
    }

    await tipoSeccion.remove();
    res.json({ message: 'Tipo de sección eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};