import Equipo from '../models/equipo.js';
import Funcion from '../models/funcion.js';
import Orden from '../models/orden.js';

// Obtener todos los miembros del equipo
export const getEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.find().populate('funcion', 'nombre').populate('orden_id');
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo miembro del equipo
export const createEquipo = async (req, res) => {
  const { nombre, foto, funcion, descripcion, ordenGeneral, ordenIndividual } = req.body;

  if (!nombre || !foto || !funcion || !descripcion || ordenGeneral === undefined || ordenIndividual === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const funcionExistente = await Funcion.findById(funcion);
    if (!funcionExistente) {
      return res.status(400).json({ message: 'Función no válida.' });
    }

    const newOrden = new Orden({ ordenGeneral, ordenIndividual });
    await newOrden.save();

    const newEquipo = new Equipo({ nombre, foto, funcion, descripcion, orden_id: newOrden._id });
    await newEquipo.save();
    res.status(201).json(newEquipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un miembro del equipo
export const updateEquipo = async (req, res) => {
  const { id } = req.params;
  const { nombre, foto, funcion, descripcion, ordenGeneral, ordenIndividual } = req.body;

  try {
    const equipo = await Equipo.findById(id).populate('orden_id');
    if (!equipo) {
      return res.status(404).json({ message: 'Miembro del equipo no encontrado.' });
    }

    if (nombre) equipo.nombre = nombre;
    if (foto) equipo.foto = foto;
    if (funcion) equipo.funcion = funcion;
    if (descripcion) equipo.descripcion = descripcion;

    if (ordenGeneral !== undefined || ordenIndividual !== undefined) {
      const orden = await Orden.findById(equipo.orden_id);
      if (ordenGeneral !== undefined) orden.ordenGeneral = ordenGeneral;
      if (ordenIndividual !== undefined) orden.ordenIndividual = ordenIndividual;
      await orden.save();
    }

    await equipo.save();
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un miembro del equipo
export const deleteEquipo = async (req, res) => {
  const { id } = req.params;

  try {
    const equipo = await Equipo.findById(id);
    if (!equipo) {
      return res.status(404).json({ message: 'Miembro del equipo no encontrado.' });
    }

    await Orden.findByIdAndDelete(equipo.orden_id);
    await equipo.remove();
    res.json({ message: 'Miembro del equipo eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};