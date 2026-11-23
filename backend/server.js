const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock Database - Looks de Moda
const looks = [
  {
    id: 1,
    nombre: "Casual Chic",
    descripcion: "Perfecto para un día relajado",
    prendas: ["Jeans azul", "Blusa blanca", "Blazer rosa"],
    ocacion: "Casual",
    imagen: "casual-chic.jpg"
  },
  {
    id: 2,
    nombre: "Business Elegante",
    descripcion: "Para reuniones profesionales",
    prendas: ["Pantalón negro", "Blusa morada", "Tacones negros"],
    ocacion: "Formal",
    imagen: "business-elegant.jpg"
  },
  {
    id: 3,
    nombre: "Noche Glamorosa",
    descripcion: "Para salir de noche",
    prendas: ["Vestido negro", "Tacones plateados", "Bolso dorado"],
    ocacion: "Noche",
    imagen: "noche-glamorosa.jpg"
  }
];

// Mock Database - Usuarios
const usuarios = [];

// RUTAS API

// 1. Obtener todos los looks
app.get('/api/looks', (req, res) => {
  res.json({ success: true, data: looks });
});

// 2. Obtener look por ID
app.get('/api/looks/:id', (req, res) => {
  const look = looks.find(l => l.id === parseInt(req.params.id));
  if (look) {
    res.json({ success: true, data: look });
  } else {
    res.status(404).json({ success: false, message: 'Look no encontrado' });
  }
});

// 3. Crear nuevo look (VULNERABLE A XSS - Intencional para pruebas)
app.post('/api/looks', (req, res) => {
  const { nombre, descripcion, prendas, ocacion } = req.body;
  
  // SIN SANITIZACIÓN - VULNERABLE
  if (!nombre || !descripcion) {
    return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
  }

  const newLook = {
    id: looks.length + 1,
    nombre: nombre, // ⚠️ Vulnerable a XSS
    descripcion: descripcion, // ⚠️ Vulnerable a XSS
    prendas: prendas || [],
    ocacion: ocacion || 'Casual',
    imagen: 'default.jpg'
  };

  looks.push(newLook);
  res.status(201).json({ success: true, data: newLook, message: 'Look creado exitosamente' });
});

// 4. Registrar usuario (VULNERABLE A SQL INJECTION EN CONCEPTO)
app.post('/api/register', (req, res) => {
  const { email, password, nombre } = req.body;

  // Validación básica
  if (!email || !password || !nombre) {
    return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
  }

  // SIN ENCRIPTACIÓN - VULNERABLE
  const usuario = {
    id: usuarios.length + 1,
    email: email,
    password: password, // ⚠️ Almacenado en texto plano
    nombre: nombre
  };

  usuarios.push(usuario);
  res.status(201).json({ success: true, message: 'Usuario registrado', usuario });
});

// 5. Login (VULNERABLE - Sin verificación real)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // SIN VERIFICACIÓN SEGURA
  const usuario = usuarios.find(u => u.email === email);
  
  if (usuario && usuario.password === password) {
    res.json({ success: true, message: 'Login exitoso', token: 'fake-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

// 6. Actualizar look (VULNERABLE - Sin validación de propietario)
app.put('/api/looks/:id', (req, res) => {
  const look = looks.find(l => l.id === parseInt(req.params.id));
  
  if (!look) {
    return res.status(404).json({ success: false, message: 'Look no encontrado' });
  }

  // Sin verificar si el usuario es el propietario
  if (req.body.nombre) look.nombre = req.body.nombre;
  if (req.body.descripcion) look.descripcion = req.body.descripcion;
  if (req.body.prendas) look.prendas = req.body.prendas;

  res.json({ success: true, data: look, message: 'Look actualizado' });
});

// 7. Eliminar look
app.delete('/api/looks/:id', (req, res) => {
  const index = looks.findIndex(l => l.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Look no encontrado' });
  }

  const deletedLook = looks.splice(index, 1);
  res.json({ success: true, message: 'Look eliminado', data: deletedLook });
});

// 8. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error en el servidor' });
});

app.listen(PORT, () => {
  console.log(`🌸 LookMaker backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   GET  /api/looks`);
  console.log(`   GET  /api/looks/:id`);
  console.log(`   POST /api/looks`);
  console.log(`   PUT  /api/looks/:id`);
  console.log(`   DELETE /api/looks/:id`);
  console.log(`   POST /api/register`);
  console.log(`   POST /api/login`);
});

module.exports = app;
