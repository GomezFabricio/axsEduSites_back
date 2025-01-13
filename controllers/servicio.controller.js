import Servicio from '../models/servicio.js';

// Obtener todos los servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find().sort({ orden: 1 }); // Ordenar por el atributo 'orden'
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  const { nombre, descripcion, imagen, orden } = req.body;

  if (!nombre || !descripcion || !imagen || orden === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newServicio = new Servicio({ nombre, descripcion, imagen, orden });
    await newServicio.save();
    res.status(201).json(newServicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un servicio
export const updateServicio = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, orden } = req.body;

  try {
    const servicio = await Servicio.findById(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado.' });
    }

    if (nombre) servicio.nombre = nombre;
    if (descripcion) servicio.descripcion = descripcion;
    if (imagen) servicio.imagen = imagen;
    if (orden !== undefined) servicio.orden = orden;

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

    await servicio.remove();
    res.json({ message: 'Servicio eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};