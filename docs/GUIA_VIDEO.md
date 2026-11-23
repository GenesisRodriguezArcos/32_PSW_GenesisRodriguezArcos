# 🎬 GUÍA PARA VIDEO DE DEMOSTRACIÓN

**Proyecto:** LookMaker - Generador de Looks de Moda  
**Duración Recomendada:** 10-12 minutos  
**Requisitos:** Cámara activa, micrófono, pantalla compartida

---

## ESTRUCTURA DEL VIDEO

### Segmento 1: Introducción (1-2 minutos)

**Contenido a cubrir:**
- Presenta el proyecto: "Hoy les muestro LookMaker, una aplicación web para crear y gestionar looks de moda"
- Objetivo del video: "Vamos a ver pruebas automatizadas, vulnerabilidades de seguridad y cómo protegernos"
- Mostrar la pantalla de presentación

**Script sugerido:**
> "Hola, soy [Tu Nombre]. Hoy voy a presentar LookMaker, un proyecto educativo que simula una aplicación real de gestión de looks de moda. Este proyecto demuestra conceptos importantes de pruebas de software y seguridad web. Vamos a cubrir tres aspectos clave: la construcción de la aplicación, pruebas automatizadas con Selenium, y análisis de seguridad con OWASP ZAP."

---

### Segmento 2: Construcción del Proyecto (2-3 minutos)

#### Parte A: Explicar la Arquitectura

**Mostrar en pantalla:**
- Estructura de carpetas (frontend, backend, tests)
- Diagrama de componentes

**Script:**
> "El proyecto está dividido en tres partes:
> - **Backend:** Un servidor Express.js que maneja la lógica de negocio y base de datos
> - **Frontend:** HTML, CSS y JavaScript para una interfaz bonita y femenina
> - **Tests:** Scripts de pruebas automatizadas
> 
> La arquitectura es típica de una aplicación web moderna"

#### Parte B: Mostrar el Backend

**Código a mostrar:** `backend/server.js`

```javascript
// Mostrar los endpoints principales
app.get('/api/looks', (req, res) => {
  res.json({ success: true, data: looks });
});

app.post('/api/looks', (req, res) => {
  // Crear nuevo look
});
```

**Explicar:**
- Endpoints REST (GET, POST, PUT, DELETE)
- Base de datos mock en memoria
- Vulnerabilidades intencionales (XSS, passwords sin encriptar)

#### Parte C: Mostrar el Frontend

**Captura de pantalla:** `frontend/index.html`

**Explicar:**
- Diseño moderno con tema de moda
- Formularios para crear looks
- Navegación entre secciones
- Estilos CSS bonitos

**Script:**
> "Como ven, tenemos una interfaz limpia y moderna con colores pasteles. El diseño es responsive y funciona bien en dispositivos móviles. Tiene tres secciones principales: Mis Looks, Crear Look, y Login."

---

### Segmento 3: Pruebas Automatizadas con Selenium (3-4 minutos)

#### Parte A: ¿Qué son las pruebas automatizadas?

**Script:**
> "Las pruebas automatizadas permiten verificar que la aplicación funciona correctamente sin intervención manual. Selenium es una herramienta que controla el navegador automáticamente, simulando acciones de usuario como clicks y escritura."

#### Parte B: Mostrar el Script de Selenium

**Archivo:** `tests/selenium_tests.js`

**Código a destacar:**
```javascript
async test_CreateLook() {
  // Navegar a crear
  const navCrear = await this.driver.findElement(By.id('nav-crear'));
  await navCrear.click();
  
  // Llenar formulario
  const nombreInput = await this.driver.findElement(By.id('nombre'));
  await nombreInput.sendKeys('Look Romántico 💕');
  
  // Enviar
  const submitBtn = await this.driver.findElement(By.id('btn-crear'));
  await submitBtn.click();
}
```

**Explicar:**
- Cómo buscar elementos (By.id, By.className)
- Interacciones (click, sendKeys, getText)
- Esperas (wait, sleep)

#### Parte C: Ejecutar las Pruebas

**Terminal:**
```bash
npm install
npm start  # En una terminal
npm test   # En otra terminal
```

**Mostrar output:**
```
✓ TEST 1: Cargar página principal
✓ TEST 2: Verificar elementos principales
✓ TEST 3: Navegación entre secciones
✓ TEST 4: Crear un nuevo look
✓ TEST 5: Verificar que el look aparece en la lista
✓ TEST 6: Formulario de Registro
✓ TEST 7: Formulario de Login
✓ TEST 8: Validación de campos requeridos

✓ Pruebas Exitosas: 8
✗ Pruebas Fallidas: 0
```

**Script:**
> "Como ven, todas las 8 pruebas pasaron exitosamente. Esto significa que la aplicación funciona como se espera. Las pruebas automatizadas nos ahorran tiempo y garantizan que los cambios futuros no rompan la funcionalidad."

#### Parte D: Comparación Selenium vs Playwright

**Mostrar documento:** `docs/SELENIUM_vs_PLAYWRIGHT.md`

**Puntos clave a destacar:**
- **Velocidad:** Playwright es 20-30% más rápido
- **Facilidad:** Playwright tiene API más intuitiva
- **Estabilidad:** Playwright tiene auto-esperas mejor
- **Compatibilidad:** Selenium soporta más navegadores

**Tabla visual:**
| Aspecto | Selenium | Playwright |
|---|---|---|
| Velocidad | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Facilidad | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Comunidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

### Segmento 4: Análisis de Seguridad (2-3 minutos)

#### Parte A: Introducción a Seguridad Web

**Script:**
> "Ahora vamos a hablar de seguridad. Las aplicaciones web son objetivos frecuentes de ataques. OWASP es una organización que identifica las vulnerabilidades más comunes. Vamos a usar OWASP ZAP para analizar nuestra aplicación."

#### Parte B: Mostrar Vulnerabilidades Encontradas

**Documento:** `docs/INFORME_SEGURIDAD.md`

**Vulnerabilidades a mostrar:**

1. **XSS (Cross-Site Scripting)**
   - Mostrar payload: `<img src=x onerror="alert('XSS')">`
   - Explicar impacto: "Un atacante puede inyectar código malicioso"
   - Mostrar solución: `escapeHtml()` en el frontend

2. **Passwords sin encriptar**
   - Mostrar código vulnerable:
   ```javascript
   password: password  // ⚠️ EN TEXTO PLANO
   ```
   - Explicar riesgo: "Si la base de datos se compromete, todas las contraseñas están visibles"
   - Mostrar solución: `bcrypt.hash()`

3. **Falta de autenticación**
   - Mostrar que se puede eliminar datos sin login
   - Explicar impacto: "Cualquiera puede sabotear la aplicación"
   - Mostrar solución: Middleware JWT

#### Parte C: Demostración de OWASP ZAP

**Pasos a realizar en vivo (o mostrar captura):**

1. Iniciar OWASP ZAP
2. Configurar la URL base: `http://localhost:3000`
3. Ejecutar ataque de spider
4. Ejecutar escaneo activo
5. Mostrar resultados: "7 vulnerabilidades encontradas"

**Captura de pantalla a mostrar:**
```
Vulnerabilidades por Severidad:
🔴 Crítica: 2
🟠 Alta: 3
🟡 Media: 2
```

**Script:**
> "Como ven, se encontraron 7 vulnerabilidades. 2 críticas: XSS y almacenamiento de contraseñas. 3 altas, incluyendo falta de autenticación. Y 2 medias, como falta de HTTPS. Estos son problemas reales que debemos solucionar."

---

### Segmento 5: Medidas Preventivas (1-2 minutos)

**Mostrar soluciones:**

#### 1. Contra XSS
```javascript
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

#### 2. Contra Passwords débiles
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

#### 3. Contra Acceso no autorizado
```javascript
function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  // Validar token
  next();
}
```

**Script:**
> "Para cada vulnerabilidad, hay soluciones específicas. La clave es: 1) Validar toda entrada, 2) Encriptar datos sensibles, 3) Autenticar usuarios, 4) Usar HTTPS. Estos principios aplican a cualquier aplicación web."

---

### Segmento 6: 4 Conclusiones sobre Importancia de Pruebas y Seguridad (2 minutos)

**Leer las siguientes conclusiones con énfasis:**

#### Conclusión 1: Prevención de Bugs en Producción
> "Las pruebas automatizadas previenen que bugs lleguen a producción. Cada vez que modificamos código, podemos ejecutar las pruebas para verificar que nada se rompió. Esto es especialmente importante en aplicaciones con muchos usuarios."

#### Conclusión 2: Seguridad es Responsabilidad de Todos
> "La seguridad no es solo tarea del equipo de seguridad. Cada desarrollador debe escribir código seguro desde el principio. Validar entrada, encriptar datos, implementar autenticación correctamente son prácticas básicas que todos debemos conocer."

#### Conclusión 3: Vulnerabilidades Tienen Consecuencias Reales
> "Las vulnerabilidades como XSS o contraseñas sin encriptar no son problemas teóricos. Pueden llevar a robo de datos, fraude, pérdida de privacidad de usuarios. En el mundo real, esto resulta en multas, pérdida de confianza, y daño a la reputación."

#### Conclusión 4: Mejora Continua en Seguridad
> "La seguridad es un proceso continuo, no un destino. Nuevas vulnerabilidades se descubren constantemente. Las herramientas como OWASP ZAP nos ayudan a encontrar problemas, pero también debemos mantenernos actualizados sobre las mejores prácticas y tendencias."

---

## CONSEJOS DE PRESENTACIÓN

### Técnicos
- ✅ Probar todo antes de grabar
- ✅ Tener dos terminales abiertas (backend en una, tests en otra)
- ✅ Aumentar el tamaño de texto en el IDE (mínimo 16pt)
- ✅ Desactivar notificaciones durante grabación
- ✅ Usar micrófono de buena calidad

### De Contenido
- ✅ Hablar claro y pausado
- ✅ No saltar demasiado entre secciones
- ✅ Dar tiempo para que el espectador procese información
- ✅ Usar ejemplos del mundo real
- ✅ Mostrar tanto el "qué" como el "por qué"

### De Presentación
- ✅ Vestuario profesional pero cómodo
- ✅ Iluminación adecuada (frontal, sin sombras)
- ✅ Fondo limpio o profesional
- ✅ Cámara a la altura de los ojos
- ✅ Contacto visual con la cámara

---

## TIMELINE DE GRABACIÓN

| Tiempo | Contenido | Duración |
|---|---|---|
| 0:00 - 0:30 | Intro y presentación | 30 seg |
| 0:30 - 1:00 | Presentar proyecto | 30 seg |
| 1:00 - 3:30 | Arquitectura y construcción | 2.5 min |
| 3:30 - 7:00 | Pruebas con Selenium | 3.5 min |
| 7:00 - 9:00 | Análisis de seguridad | 2 min |
| 9:00 - 10:00 | Medidas preventivas | 1 min |
| 10:00 - 11:30 | 4 Conclusiones | 1.5 min |
| 11:30 - 12:00 | Cierre y preguntas | 30 seg |

**Total: ~12 minutos**

---

## PUNTOS IMPORTANTES A ENFATIZAR

1. **Replicabilidad:** "Este proyecto puede ser ejecutado en su computadora con `npm start` y `npm test`"

2. **Educativo:** "Este es un ejemplo educativo con vulnerabilidades intencionales para demostrar cómo se ven"

3. **Mejoras:** "En una aplicación real, todas estas vulnerabilidades estarían corregidas"

4. **Automatización:** "Las pruebas automatizadas ahorran tiempo y mejoran la calidad"

5. **Continuidad:** "Seguridad no es un evento, es un proceso continuo"

---

## RECURSOS PARA EL VIDEO

### Archivos a mostrar
- [ ] `frontend/index.html` - Interfaz bonita
- [ ] `backend/server.js` - Lógica de negocio
- [ ] `tests/selenium_tests.js` - Script de pruebas
- [ ] `docs/SELENIUM_vs_PLAYWRIGHT.md` - Comparación
- [ ] `docs/INFORME_SEGURIDAD.md` - Vulnerabilidades
- [ ] `docs/GUIA_VIDEO.md` - Esta guía

### Herramientas a usar
- [ ] Visual Studio Code (IDE)
- [ ] Terminal PowerShell
- [ ] Chrome DevTools
- [ ] OWASP ZAP (opcional, o mostrar capturas)

### Pantallas a compartir
- [ ] Código fuente
- [ ] Terminal con tests ejecutándose
- [ ] Interfaz de la aplicación
- [ ] Documentación

---

## GUIÓN DE CIERRE

> "En conclusión, hemos visto cómo construir una aplicación web con pruebas automatizadas y cómo identificar vulnerabilidades de seguridad. Las pruebas y la seguridad no son tareas posteriores al desarrollo, deben ser parte del proceso desde el inicio. 

> Agradezco su atención. Este proyecto está disponible en [URL del repositorio] para que lo exploren y practiquen. Recuerden: **Code with security in mind. Test your code. Automate everything.**"

---

**Preparado para:** Video de demostración 📹  
**Proyecto:** LookMaker - Generador de Looks de Moda  
**Fecha:** Noviembre 2024

