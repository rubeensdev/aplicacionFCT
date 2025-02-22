const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

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

// Endpoint para obtener los datos de la tabla contactosempresas
app.get("/contactosempresas", (req, res) => {
  const query = `SELECT * FROM contactosempresas`;
  conexion.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos de la tabla contactosempresas:", err);
      return res
        .status(500)
        .send("Error al obtener los datos de la tabla contactosempresas");
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
  const { nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena } = req.body;
  const query = `INSERT INTO profesores (nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [nombre, departamento, telefono, email, direccion, fechaDeNacimiento, genero, rol, tipoDeContrato, fechaIngreso, estadoProfesor, centro, fotoPerfil, notasAdicionales, contrasena], (err, result) => {
    if (err) {
      console.error("Error al insertar en la tabla profesores:", err);
      return res.status(500).json({ error: "Error al insertar en la tabla profesores" });
    }
    res.json({
      message: "Profesor insertado correctamente",
      id: result.insertId,
    });
  });
});

// POST endpoint para insertar datos en la tabla empresas
app.post('/anadeEmpresas', (req, res) => {
  const { nombre, razonSocial, tipo, nif, email, telefono, direccion, ciudad, codigoPostal, pais, fechaConstitucion, sector, numeroEmpleados, sitioWeb, logo, representanteLegal, contacto, fechaAlta, notasAdicionales, estadoEmpresa } = req.body;
  const query = `INSERT INTO empresas (nombre, razonSocial, tipo, nif, email, telefono, direccion, ciudad, codigoPostal, pais, fechaConstitucion, sector, numeroEmpleados, sitioWeb, logo, representanteLegal, contacto, fechaAlta, notasAdicionales, estadoEmpresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [nombre, razonSocial, tipo, nif, email, telefono, direccion, ciudad, codigoPostal, pais, fechaConstitucion, sector, numeroEmpleados, sitioWeb, logo, representanteLegal, contacto, fechaAlta, notasAdicionales, estadoEmpresa], (err, result) => {
    if (err) {
      console.error("Error al insertar en la tabla empresas:", err);
      return res.status(500).json({ error: "Error al insertar en la tabla empresas" });
    }
    res.json({
      message: "Empresa insertada correctamente",
      id: result.insertId,
    });
  });
});

// POST endpoint para insertar datos en la tabla contactosempresas
app.post('/anadeContacto', (req, res) => {
  const { empresaCodigo, nombreEmpresa, nombreContacto, cargo, departamento, email, telefono, extension, direccionOficina, horarioTrabajo, nivelAcceso, relacionEmpresa, fechaIngreso, fotoPerfil, observaciones, estadoContacto, notasAdicionales } = req.body;
  const query = `INSERT INTO contactosempresas (empresaCodigo, nombreEmpresa, nombreContacto, cargo, departamento, email, telefono, extension, direccionOficina, horarioTrabajo, nivelAcceso, relacionEmpresa, fechaIngreso, fotoPerfil, observaciones, estadoContacto, notasAdicionales) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [empresaCodigo, nombreEmpresa, nombreContacto, cargo, departamento, email, telefono, extension, direccionOficina, horarioTrabajo, nivelAcceso, relacionEmpresa, fechaIngreso, fotoPerfil, observaciones, estadoContacto, notasAdicionales], (err, result) => {
    if (err) {
      console.error("Error al insertar en la tabla contactosempresas:", err);
      return res.status(500).json({ error: "Error al insertar en la tabla contactosempresas" });
    }
    res.json({
      message: "Contacto insertado correctamente",
      id: result.insertId,
    });
  });
});

// POST endpoint para insertar datos en la tabla alumnos
app.post('/anadeAlumno', (req, res) => {
  const { nombre, clase, estado_practicas, fechaNacimiento, genero, email, telefono, direccion, centroEducativo, tutor, estadoAlumno, fechaInscripcion, fotoPerfil, notasAcademicas, observaciones } = req.body;
  const query = `INSERT INTO alumnos (id, nombre, clase, estado_practicas, fechaNacimiento, genero, email, telefono, direccion, centroEducativo, tutor, estadoAlumno, fechaInscripcion, fotoPerfil, notasAcademicas, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conexion.query(query, [ nombre, clase, estado_practicas, fechaNacimiento, genero, email, telefono, direccion, centroEducativo, tutor, estadoAlumno, fechaInscripcion, fotoPerfil, notasAcademicas, observaciones], (err, result) => {
    if (err) {
      console.error('Error al insertar en la tabla alumnos:', err);
      return res.status(500).json({ error: 'Error al insertar en la tabla alumnos' });
    }
    res.json({
      message: 'Alumno insertado correctamente',
      id: result.insertId,
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});