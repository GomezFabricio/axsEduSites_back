import Auditoria from '../models/auditoria.js';

// Obtener todas las auditorías
export const getAuditorias = async (req, res) => {
  try {
    const auditorias = await Auditoria.find().populate('usuario_id', 'nombre email');
    res.json(auditorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva auditoría
export const createAuditoria = async (req, res) => {
  const { usuario_id, accion, entidad_afectada, id_entidad_afectada, cambios } = req.body;

  if (!usuario_id || !accion || !entidad_afectada || !id_entidad_afectada || !cambios) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const newAuditoria = new Auditoria({ usuario_id, accion, entidad_afectada, id_entidad_afectada, cambios });
    await newAuditoria.save();
    res.status(201).json(newAuditoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una auditoría por ID
export const getAuditoriaById = async (req, res) => {
  const { id } = req.params;

  try {
    const auditoria = await Auditoria.findById(id).populate('usuario_id', 'nombre email');
    if (!auditoria) {
      return res.status(404).json({ message: 'Auditoría no encontrada.' });
    }
    res.json(auditoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};