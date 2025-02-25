import PageContent from '../models/pageContent.js';

// Obtener el contenido de la página
export const getPageContent = async (req, res) => {
  try {
    const pageContent = await PageContent.find();
    res.json(pageContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo contenido de página
export const createPageContent = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'El contenido es obligatorio.' });
  }

  try {
    const newPageContent = new PageContent({ content });
    await newPageContent.save();
    res.status(201).json(newPageContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el contenido de la página
export const updatePageContent = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const pageContent = await PageContent.findById(id);
    if (!pageContent) {
      return res.status(404).json({ message: 'Contenido no encontrado.' });
    }

    pageContent.content = content;
    await pageContent.save();
    res.json(pageContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar el contenido de la página
export const deletePageContent = async (req, res) => {
  const { id } = req.params;

  try {
    const pageContent = await PageContent.findById(id);
    if (!pageContent) {
      return res.status(404).json({ message: 'Contenido no encontrado.' });
    }

    await pageContent.remove();
    res.json({ message: 'Contenido eliminado.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};