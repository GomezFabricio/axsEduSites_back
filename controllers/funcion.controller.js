import Funcion from '../models/funcion.js';

// Obtener todas las funciones
export const getFunciones = async (req, res) => {
  try {
    const funciones = await Funcion.find();
    res.json(funciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva función
export const createFuncion = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newFuncion = new Funcion({ nombre, descripcion });
    await newFuncion.save();
    res.status(201).json(newFuncion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una función
export const updateFuncion = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const funcion = await Funcion.findById(id);
    if (!funcion) {
      return res.status(404).json({ message: 'Función no encontrada.' });
    }

    if (nombre) funcion.nombre = nombre;
    if (descripcion) funcion.descripcion = descripcion;

    await funcion.save();
    res.json(funcion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una función
export const deleteFuncion = async (req, res) => {
  const { id } = req.params;

  try {
    const funcion = await Funcion.findById(id);
    if (!funcion) {
      return res.status(404).json({ message: 'Función no encontrada.' });
    }

    await funcion.remove();
    res.json({ message: 'Función eliminada.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};