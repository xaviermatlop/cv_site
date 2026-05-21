import React, { useState, useEffect } from 'react';
import './App.css';

// Si no hay API_URL en env, usa datos de ejemplo para el build
const API_URL = process.env.REACT_APP_API_URL || null;

const CV_DEFAULT = {
  nombre: 'Tu Nombre Apellido',
  titulo: 'Desarrollador Web Full Stack',
  email: 'tu@email.com',
  github: 'github.com/tuusuario',
  descripcion: 'Desarrollador web apasionado por la tecnología y el aprendizaje continuo.',
  habilidades: ['PHP', 'JavaScript', 'React', 'MySQL', 'Git', 'Docker'],
  experiencia: [
    {
      empresa: 'Empresa de Prácticas S.L.',
      cargo: 'Desarrollador Web (Prácticas FCT)',
      periodo: 'Marzo 2026 – Junio 2026',
      descripcion: 'Desarrollo y mantenimiento de aplicaciones web con PHP y MySQL.',
    },
  ],
  educacion: [
    {
      institucion: 'Monlau Formació Professional',
      titulo: 'CFGS Desarrollo de Aplicaciones Web (DAW)',
      periodo: '2024 – 2026',
    },
  ],
};

function App() {
  const [cv, setCv] = useState(CV_DEFAULT);
  const [loading, setLoading] = useState(!!API_URL);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/cv.php`)
      .then(r => r.json())
      .then(data => { setCv(data); setLoading(false); })
      .catch(() => { setError('No se pudo cargar la API'); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Cargando CV...</div>;

  return (
    <div className="cv-container">
      <aside className="sidebar">
        <div className="profile-circle">
          {cv.nombre ? cv.nombre.split(' ').map(n => n[0]).join('').slice(0, 2) : 'CV'}
        </div>
        <h1 className="sidebar-name">{cv.nombre}</h1>
        <p className="sidebar-title">{cv.titulo || cv.profesion}</p>

        {(cv.email || cv.github) && (
          <div className="sidebar-section">
            <p className="section-label">Contacto</p>
            {cv.email && <p className="contact-item">✉ {cv.email}</p>}
            {cv.github && <p className="contact-item">🐙 {cv.github}</p>}
          </div>
        )}

        {cv.habilidades && cv.habilidades.length > 0 && (
          <div className="sidebar-section">
            <p className="section-label">Habilidades</p>
            <div className="skills-wrap">
              {cv.habilidades.map(s => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>
        )}

        {error && <p className="error-msg">{error}</p>}
      </aside>

      <main className="main-content">
        {cv.descripcion && (
          <section className="main-section">
            <p className="main-label">Sobre mí</p>
            <p className="about-text">{cv.descripcion}</p>
          </section>
        )}

        {cv.experiencia && (
          <section className="main-section">
            <p className="main-label">Experiencia</p>
            {Array.isArray(cv.experiencia) ? (
              cv.experiencia.map((e, i) => (
                <div key={i} className="timeline-item">
                  <p className="item-title">{e.empresa}</p>
                  <p className="item-sub">{e.cargo}</p>
                  <p className="item-period">{e.periodo}</p>
                  <p className="item-desc">{e.descripcion}</p>
                </div>
              ))
            ) : (
              <p className="about-text">{cv.experiencia}</p>
            )}
          </section>
        )}

        {cv.educacion && cv.educacion.length > 0 && (
          <section className="main-section">
            <p className="main-label">Educación</p>
            {cv.educacion.map((e, i) => (
              <div key={i} className="timeline-item">
                <p className="item-title">{e.institucion}</p>
                <p className="item-sub">{e.titulo}</p>
                <p className="item-period">{e.periodo}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
