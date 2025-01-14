import TrabajoRealizado from '../models/trabajoRealizado.js';
import Orden from '../models/orden.js';

// Obtener todos los trabajos realizados
export const getTrabajosRealizados = async (req, res) => {
  try {
    const trabajos = await TrabajoRealizado.find().populate('orden_id');
    res.json(trabajos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo trabajo realizado
export const createTrabajoRealizado = async (req, res) => {
  const { titulo, descripcion, imagenes, ordenGeneral, ordenIndividual } = req.body;

  if (!titulo || !descripcion || !imagenes || ordenGeneral === undefined || ordenIndividual === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newOrden = new Orden({ ordenGeneral, ordenIndividual });
    await newOrden.save();

    const newTrabajo = new TrabajoRealizado({ titulo, descripcion, imagenes, orden_id: newOrden._id });
    await newTrabajo.save();
    res.status(201).json(newTrabajo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un trabajo realizado
export const updateTrabajoRealizado = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagenes, ordenGeneral, ordenIndividual } = req.body;

  try {
    const trabajo = await TrabajoRealizado.findById(id).populate('orden_id');
    if (!trabajo) {
      return res.status(404).json({ message: 'Trabajo no encontrado.' });
    }

    if (titulo) trabajo.titulo = titulo;
    if (descripcion) trabajo.descripcion = descripcion;
    if (imagenes) trabajo.imagenes = imagenes;

    if (ordenGeneral !== undefined || ordenIndividual !== undefined) {
      const orden = await Orden.findById(trabajo.orden_id);
      if (ordenGeneral !== undefined) orden.ordenGeneral = ordenGeneral;
      if (ordenIndividual !== undefined) orden.ordenIndividual = ordenIndividual;
      await orden.save();
    }

    await trabajo.save();
    res.json(trabajo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un trabajo realizado
export const deleteTrabajoRealizado = async (req, res) => {
  const { id } = req.params;

  try {
    const trabajo = await TrabajoRealizado.findById(id);
    if (!trabajo) {
      return res.status(404).json({ message: 'Trabajo no encontrado.' });
    }

    await Orden.findByIdAndDelete(trabajo.orden_id);
    await trabajo.remove();
    res.json({ message: 'Trabajo eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};