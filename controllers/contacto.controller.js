import Contacto from '../models/contacto.js';

// Obtener todos los mensajes de contacto
export const getContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo mensaje de contacto
export const createContacto = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newContacto = new Contacto({ nombre, email, mensaje });
    await newContacto.save();
    res.status(201).json(newContacto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un mensaje de contacto
export const deleteContacto = async (req, res) => {
  const { id } = req.params;

  try {
    const contacto = await Contacto.findById(id);
    if (!contacto) {
      return res.status(404).json({ message: 'Mensaje de contacto no encontrado.' });
    }

    await contacto.remove();
    res.json({ message: 'Mensaje de contacto eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};