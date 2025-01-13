import TrabajoRealizado from '../models/trabajoRealizado.js';

// Obtener todos los trabajos realizados
export const getTrabajosRealizados = async (req, res) => {
  try {
    const trabajos = await TrabajoRealizado.find().sort({ orden: 1 }); // Ordenar por el atributo 'orden'
    res.json(trabajos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo trabajo realizado
export const createTrabajoRealizado = async (req, res) => {
  const { titulo, descripcion, imagenes, orden } = req.body;

  if (!titulo || !descripcion || !imagenes || orden === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newTrabajo = new TrabajoRealizado({ titulo, descripcion, imagenes, orden });
    await newTrabajo.save();
    res.status(201).json(newTrabajo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un trabajo realizado
export const updateTrabajoRealizado = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagenes, orden } = req.body;

  try {
    const trabajo = await TrabajoRealizado.findById(id);
    if (!trabajo) {
      return res.status(404).json({ message: 'Trabajo no encontrado.' });
    }

    if (titulo) trabajo.titulo = titulo;
    if (descripcion) trabajo.descripcion = descripcion;
    if (imagenes) trabajo.imagenes = imagenes;
    if (orden !== undefined) trabajo.orden = orden;

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

    await trabajo.remove();
    res.json({ message: 'Trabajo eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};