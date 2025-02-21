const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/addAlumno', (req, res) => {
  const nuevoAlumno = req.body;

  fs.readFile('datos.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo');
    }

    const jsonData = JSON.parse(data);
    jsonData.alumnos.push(nuevoAlumno);

    fs.writeFile('datos.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error al escribir en el archivo');
      }

      res.send('Alumno agregado exitosamente');
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});