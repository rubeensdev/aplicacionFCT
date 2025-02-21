const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Configura la conexión a la base de datos
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto si tu usuario de MySQL es diferente
  password: "", // Cambia esto si tu contraseña de MySQL es diferente
  database: "fct",
});

conexion.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Endpoint para obtener los datos de la tabla profesores
app.get("/profesores", (req, res) => {
  const query = `SELECT * FROM profesores`;
  conexion.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .send("Error al obtener los datos de la tabla profesores");
    }
    res.json(results);
  });
});

// Endpoint para obtener los datos de la tabla empresas
app.get("/empresas", (req, res) => {
  const query = `SELECT * FROM empresas`;
  conexion.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .send("Error al obtener los datos de la tabla empresas");
    }
    res.json(results);
  });
});

// Endpoint para obtener los datos de la tabla contactoempresas
app.get("/contactosempresas", (req, res) => {
  const query = `SELECT * FROM contactosempresas`;
  conexion.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos de la tabla contactoempresas:", err);
      return res
        .status(500)
        .send("Error al obtener los datos de la tabla contactoempresas");
    }
    res.json(results);
  });
});

// Endpoint para obtener los datos de la tabla alumnos
app.get("/alumnos", (req, res) => {
  const query = `SELECT * FROM alumnos`;
  conexion.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .send("Error al obtener los datos de la tabla alumnos");
    }
    res.json(results);
  });
});

// POST endpoint para insertar datos en la tabla profesores
app.post('/anadeProfesores', (req, res) => {
  const { codigo, nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena } = req.body;
  const query = `INSERT INTO profesores (codigo, nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [codigo, nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al insertar en la tabla profesores" });
    }
    res.json({
      message: "Profesor insertado correctamente",
      id: result.insertId,
    });
  });
});

// POST endpoint para insertar datos en la tabla empresas
app.post("/anadeEmpresas", (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const query = `INSERT INTO empresas (nombre, direccion, telefono) VALUES (?, ?, ?)`;
  conexion.query(query, [nombre, direccion, telefono], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al insertar en la tabla empresas" });
    }
    res.json({
      message: "Empresa insertada correctamente",
      id: result.insertId,
    });
  });
});

// POST endpoint para insertar datos en la tabla contactoempresas
app.post("/anadeContactoEmpresas/", (req, res) => {
  const { nombre, empresa_id, email, telefono } = req.body;
  const query = `INSERT INTO contactoempresas (nombre, empresa_id, email, telefono) VALUES (?, ?, ?, ?)`;
  conexion.query(
    query,
    [nombre, empresa_id, email, telefono],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al insertar en la tabla contactoempresas" });
      }
      res.json({
        message: "Contacto de empresa insertado correctamente",
        id: result.insertId,
      });
    }
  );
});

// POST endpoint para insertar datos en la tabla alumnos
app.post("/anadeAlumnos/", (req, res) => {
  const { nombre, edad, curso } = req.body;
  const query = `INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)`;
  conexion.query(query, [nombre, edad, curso], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al insertar en la tabla alumnos" });
    }
    res.json({
      message: "Alumno insertado correctamente",
      id: result.insertId,
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
