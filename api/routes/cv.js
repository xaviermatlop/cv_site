const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    id: 1,
    nombre: "Xavier Mateo",
    profesion: "Desarrollador Web crazy",
    experiencia: "Despliegue automatizado con Jenkins y Docker superado con éxito."
  });
});

module.exports = router;
