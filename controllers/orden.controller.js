import Orden from '../models/orden.js';

// Obtener todos los elementos en orden
export const getOrden = async (req, res) => {
  try {
    const orden = await Orden.find().sort({ ordenGeneral: 1, ordenIndividual: 1 });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo elemento en orden
export const createOrden = async (req, res) => {
  const { ordenGeneral, ordenIndividual } = req.body;

  if (ordenGeneral === undefined || ordenIndividual === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newOrden = new Orden({ ordenGeneral, ordenIndividual });
    await newOrden.save();
    res.status(201).json(newOrden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un elemento en orden
export const updateOrden = async (req, res) => {
  const { id } = req.params;
  const { ordenGeneral, ordenIndividual } = req.body;

  try {
    const orden = await Orden.findById(id);
    if (!orden) {
      return res.status(404).json({ message: 'Elemento no encontrado.' });
    }

    if (ordenGeneral !== undefined) orden.ordenGeneral = ordenGeneral;
    if (ordenIndividual !== undefined) orden.ordenIndividual = ordenIndividual;

    await orden.save();
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un elemento en orden
export const deleteOrden = async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await Orden.findById(id);
    if (!orden) {
      return res.status(404).json({ message: 'Elemento no encontrado.' });
    }

    await orden.remove();
    res.json({ message: 'Elemento eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};