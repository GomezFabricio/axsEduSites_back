import Seccion from '../models/seccion.js';
import TipoSeccion from '../models/tipoSeccion.js';

// Obtener todas las secciones
export const getSecciones = async (req, res) => {
  try {
    const secciones = await Seccion.find().populate('tipo_seccion_id', 'nombre');
    res.json(secciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva sección
export const createSeccion = async (req, res) => {
  const { nombre, tipo_seccion_id, contenido, orden } = req.body;

  if (!nombre || !tipo_seccion_id || !contenido || orden === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const tipoSeccion = await TipoSeccion.findById(tipo_seccion_id);
    if (!tipoSeccion) {
      return res.status(400).json({ message: 'Tipo de sección no válido.' });
    }

    const newSeccion = new Seccion({ nombre, tipo_seccion_id, contenido, orden });
    await newSeccion.save();
    res.status(201).json(newSeccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una sección
export const updateSeccion = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_seccion_id, contenido, orden } = req.body;

  try {
    const seccion = await Seccion.findById(id);
    if (!seccion) {
      return res.status(404).json({ message: 'Sección no encontrada.' });
    }

    if (nombre) seccion.nombre = nombre;
    if (tipo_seccion_id) seccion.tipo_seccion_id = tipo_seccion_id;
    if (contenido) seccion.contenido = contenido;
    if (orden !== undefined) seccion.orden = orden;

    await seccion.save();
    res.json(seccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una sección
export const deleteSeccion = async (req, res) => {
  const { id } = req.params;

  try {
    const seccion = await Seccion.findById(id);
    if (!seccion) {
      return res.status(404).json({ message: 'Sección no encontrada.' });
    }

    await seccion.remove();
    res.json({ message: 'Sección eliminada.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};