import React, { useEffect, useState } from 'react';
import { getSecciones } from '../../api/sectionApi';
import { getServicios } from '../../api/servicioApi';
import { getTrabajosRealizados } from '../../api/trabajoRealizadoApi';
import { getOrden } from '../../api/ordenApi';
import './Home.css';

const Home = () => {
  const [orden, setOrden] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [trabajosRealizados, setTrabajosRealizados] = useState([]);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const data = await getOrden();
        setOrden(data);
      } catch (error) {
        console.error('Error al obtener el orden:', error);
      }
    };

    const fetchSecciones = async () => {
      try {
        const data = await getSecciones();
        setSecciones(data);
      } catch (error) {
        console.error('Error al obtener las secciones:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    const fetchTrabajosRealizados = async () => {
      try {
        const data = await getTrabajosRealizados();
        setTrabajosRealizados(data);
      } catch (error) {
        console.error('Error al obtener los trabajos realizados:', error);
      }
    };

    fetchOrden();
    fetchSecciones();
    fetchServicios();
    fetchTrabajosRealizados();
  }, []);

  const elementos = [
    ...secciones.map((seccion) => ({ ...seccion, tipo: 'Seccion' })),
    ...servicios.map((servicio) => ({ ...servicio, tipo: 'Servicio' })),
    ...trabajosRealizados.map((trabajo) => ({ ...trabajo, tipo: 'TrabajoRealizado' })),
  ];

  const elementosOrdenados = orden.map((o) => {
    const elemento = elementos.find((e) => e._id.toString() === o._id.toString());
    return { ...elemento, ordenGeneral: o.ordenGeneral, ordenIndividual: o.ordenIndividual };
  }).sort((a, b) => a.ordenGeneral - b.ordenGeneral || a.ordenIndividual - b.ordenIndividual);

  return (
    <div>
      <h2>Bienvenido a aXsEduSites</h2>
      {elementosOrdenados.map((elemento) => {
        if (elemento.tipo === 'Seccion') {
          return (
            <section id="home" key={elemento._id}>
              <div className="container">
                <div>
                  <h3>{elemento.nombre}</h3>
                  <p>{elemento.contenido.descripcion}</p>
                </div>
              </div>
            </section>
          );
        } else if (elemento.tipo === 'Servicio') {
          return (
            <section id="services" key={elemento._id}>
              <h2>Servicios</h2>
              <div className="container">
                <div>
                  <h3>{elemento.nombre}</h3>
                  <p>{elemento.descripcion}</p>
                  <img src={elemento.imagen} alt={elemento.nombre} />
                </div>
              </div>
            </section>
          );
        } else if (elemento.tipo === 'TrabajoRealizado') {
          return (
            <section id="projects" key={elemento._id}>
              <h2>Trabajos Realizados</h2>
              <div className="container">
                <div>
                  <h3>{elemento.titulo}</h3>
                  <p>{elemento.descripcion}</p>
                  {elemento.imagenes.map((imagen, index) => (
                    <img key={index} src={imagen} alt={elemento.titulo} />
                  ))}
                </div>
              </div>
            </section>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Home;