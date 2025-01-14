import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import seccionRoutes from './routes/seccion.routes.js';
import tipoSeccionRoutes from './routes/tipoSeccion.routes.js';
import funcionRoutes from './routes/funcion.routes.js';
import equipoRoutes from './routes/equipo.routes.js';
import servicioRoutes from './routes/servicio.routes.js';
import trabajoRealizadoRoutes from './routes/trabajoRealizado.routes.js';
import contactoRoutes from './routes/contacto.routes.js';
import auditoriaRoutes from './routes/auditoria.routes.js';
import roleRoutes from './routes/role.routes.js';
import ordenRoutes from './routes/orden.routes.js'; // Importar las rutas de orden

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/secciones', seccionRoutes);
app.use('/api/tipo-secciones', tipoSeccionRoutes);
app.use('/api/funciones', funcionRoutes);
app.use('/api/equipo', equipoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/trabajos-realizados', trabajoRealizadoRoutes);
app.use('/api/contactos', contactoRoutes);
app.use('/api/auditorias', auditoriaRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/orden', ordenRoutes); // Usar las rutas de orden

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});