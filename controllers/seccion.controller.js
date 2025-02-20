import Seccion from '../models/seccion.js';
import TipoSeccion from '../models/tipoSeccion.js';
import Orden from '../models/orden.js';

// Obtener todas las secciones
export const getSecciones = async (req, res) => {
  try {
    const secciones = await Seccion.find().populate('tipo_seccion_id', 'nombre').populate('orden_id');
    res.json(secciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva sección
export const createSeccion = async (req, res) => {
  const { nombre, tipo_seccion_id, contenido, ordenGeneral, ordenIndividual } = req.body;

  if (!nombre || !tipo_seccion_id || !contenido || ordenGeneral === undefined || ordenIndividual === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const tipoSeccion = await TipoSeccion.findById(tipo_seccion_id);
    if (!tipoSeccion) {
      return res.status(400).json({ message: 'Tipo de sección no válido.' });
    }

    const newOrden = new Orden({ ordenGeneral, ordenIndividual });
    await newOrden.save();

    const newSeccion = new Seccion({ nombre, tipo_seccion_id, contenido, orden_id: newOrden._id });
    await newSeccion.save();
    res.status(201).json(newSeccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una sección
export const updateSeccion = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo_seccion_id, contenido, ordenGeneral, ordenIndividual } = req.body;

  try {
    const seccion = await Seccion.findById(id).populate('orden_id');
    if (!seccion) {
      return res.status(404).json({ message: 'Sección no encontrada.' });
    }

    if (nombre) seccion.nombre = nombre;
    if (tipo_seccion_id) seccion.tipo_seccion_id = tipo_seccion_id;
    if (contenido) seccion.contenido = contenido;

    if (ordenGeneral !== undefined || ordenIndividual !== undefined) {
      const orden = await Orden.findById(seccion.orden_id);
      if (ordenGeneral !== undefined) orden.ordenGeneral = ordenGeneral;
      if (ordenIndividual !== undefined) orden.ordenIndividual = ordenIndividual;
      await orden.save();
    }

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

    await Orden.findByIdAndDelete(seccion.orden_id);
    await seccion.remove();
    res.json({ message: 'Sección eliminada.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};