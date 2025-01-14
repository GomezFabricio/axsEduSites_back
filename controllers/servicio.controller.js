import Servicio from '../models/servicio.js';
import Orden from '../models/orden.js';

// Obtener todos los servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find().populate('orden_id');
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  const { nombre, descripcion, imagen, ordenGeneral, ordenIndividual } = req.body;

  if (!nombre || !descripcion || !imagen || ordenGeneral === undefined || ordenIndividual === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newOrden = new Orden({ ordenGeneral, ordenIndividual });
    await newOrden.save();

    const newServicio = new Servicio({ nombre, descripcion, imagen, orden_id: newOrden._id });
    await newServicio.save();
    res.status(201).json(newServicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un servicio
export const updateServicio = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, ordenGeneral, ordenIndividual } = req.body;

  try {
    const servicio = await Servicio.findById(id).populate('orden_id');
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado.' });
    }

    if (nombre) servicio.nombre = nombre;
    if (descripcion) servicio.descripcion = descripcion;
    if (imagen) servicio.imagen = imagen;

    if (ordenGeneral !== undefined || ordenIndividual !== undefined) {
      const orden = await Orden.findById(servicio.orden_id);
      if (ordenGeneral !== undefined) orden.ordenGeneral = ordenGeneral;
      if (ordenIndividual !== undefined) orden.ordenIndividual = ordenIndividual;
      await orden.save();
    }

    await servicio.save();
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un servicio
export const deleteServicio = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findById(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado.' });
    }

    await Orden.findByIdAndDelete(servicio.orden_id);
    await servicio.remove();
    res.json({ message: 'Servicio eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};