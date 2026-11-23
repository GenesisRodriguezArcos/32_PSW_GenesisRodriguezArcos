# 🌸 LookMaker - Generador de Looks de Moda

**Proyecto Educativo:** Aplicación Web con Pruebas Automatizadas y Análisis de Seguridad

> Un mini proyecto que simula una aplicación real de gestión de looks de moda, con pruebas funcionales automatizadas usando Selenium y análisis de seguridad con OWASP ZAP.

---

## 📋 Descripción del Proyecto

LookMaker es una aplicación web completa que permite a usuarios crear y gestionar "looks" (combinaciones de prendas de vestir). El proyecto demuestra:

✅ Desarrollo full-stack (Frontend + Backend + API)  
✅ Pruebas automatizadas con Selenium  
✅ Análisis de vulnerabilidades de seguridad  
✅ Comparación de herramientas (Selenium vs Playwright)  
✅ Mejores prácticas en seguridad web

---

## 🎯 Objetivos de Aprendizaje

1. **Pruebas Funcionales Automatizadas (1 pt)**
   - Script con Selenium que interactúa con la aplicación
   - Validación de funcionalidad sin intervención manual
   - Comparación Selenium vs Playwright

2. **Pruebas de Seguridad (1 pt)**
   - Análisis con OWASP ZAP
   - Identificación de vulnerabilidades (XSS, CSRF, etc.)
   - Informe con medidas preventivas

3. **Documentación en Video (3 pts)**
   - Explicación de objetivo y construcción
   - Resultados de pruebas
   - 4 conclusiones sobre importancia

---

## 🏗️ Estructura del Proyecto

```
c:\Escritorio\32_PSW_GenesisRodriguezArcos\
│
├── 📁 backend/
│   └── server.js              # Servidor Express.js con API REST
│
├── 📁 frontend/
│   ├── index.html             # Interfaz principal (HTML)
│   ├── styles.css             # Estilos bonitos y femeninos
│   └── app.js                 # Lógica JavaScript del cliente
│
├── 📁 tests/
│   └── selenium_tests.js      # Suite de pruebas automatizadas
│
├── 📁 docs/
│   ├── SELENIUM_vs_PLAYWRIGHT.md    # Comparación detallada
│   ├── INFORME_SEGURIDAD.md         # Vulnerabilidades encontradas
│   └── GUIA_VIDEO.md                # Guión para video
│
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 14+ instalado
- npm o yarn
- Google Chrome (para Selenium)

### Paso 1: Instalar Dependencias
```bash
npm install
```

### Paso 2: Iniciar el Backend
```bash
npm start
```

Deberías ver:
```
🌸 LookMaker backend ejecutándose en http://localhost:3000
```

### Paso 3: Abrir la Aplicación
- Abre tu navegador en `http://localhost:3000`
- O si no abre automáticamente, navega manualmente

### Paso 4: Ejecutar Pruebas Automatizadas

**En otra terminal:**
```bash
npm test
```

Verás el navegador Chrome abrirse y ejecutar las pruebas automáticamente.

---

## 📊 Funcionalidades Principales

### 1. Ver Looks Existentes
- GET `/api/looks` - Obtiene todos los looks
- GET `/api/looks/:id` - Obtiene un look específico

### 2. Crear Nuevo Look
- POST `/api/looks` - Crea un nuevo look
- Requiere: nombre, descripción, prendas, ocasión

### 3. Gestionar Looks
- PUT `/api/looks/:id` - Actualiza un look
- DELETE `/api/looks/:id` - Elimina un look

### 4. Autenticación (Básica)
- POST `/api/register` - Registra un nuevo usuario
- POST `/api/login` - Autentica un usuario

---

## 🧪 Pruebas Automatizadas

### Ejecutar Todas las Pruebas
```bash
npm test
```

### Pruebas Incluidas (8 total)
✓ Cargar página principal  
✓ Verificar elementos principales  
✓ Navegación entre secciones  
✓ Crear un nuevo look  
✓ Verificar que el look aparece en la lista  
✓ Formulario de Registro  
✓ Formulario de Login  
✓ Validación de campos requeridos

### Output Esperado
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 TEST 1: Cargar página principal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ [10:30:45] Página principal cargada correctamente

[... más pruebas ...]

╔════════════════════════════════════════╗
║ RESUMEN DE PRUEBAS                     ║
╠════════════════════════════════════════╣
║ ✓ Pruebas Exitosas: 8                  ║
║ ✗ Pruebas Fallidas: 0                  ║
║ Total: 8                               ║
╚════════════════════════════════════════╝
```

---

## 🔒 Análisis de Seguridad

### Vulnerabilidades Encontradas: 7
- 🔴 **Críticas (2):** XSS Almacenado, Passwords en texto plano
- 🟠 **Altas (3):** Inyección, Falta de validación, Sin autenticación
- 🟡 **Medias (2):** Sin HTTPS, Sin CSRF

### Consultar Detalles
Ver `docs/INFORME_SEGURIDAD.md` para:
- Descripción detallada de cada vulnerabilidad
- Payloads de prueba
- Código vulnerable vs código seguro
- Medidas preventivas

---

## 📚 Documentación

### SELENIUM_vs_PLAYWRIGHT.md
Comparación completa entre dos herramientas de testing:
- Rendimiento (Playwright 20-30% más rápido)
- Facilidad de uso (Playwright más intuitivo)
- Estabilidad (Playwright mejor auto-esperas)
- Casos de uso para cada una

### INFORME_SEGURIDAD.md
Análisis de vulnerabilidades con:
- Vulnerabilidades específicas con severidad CVSS
- Payloads de prueba reales
- Código vulnerable y seguro lado a lado
- Plan de acción con 3 fases

### GUIA_VIDEO.md
Guión completo para video de demostración:
- Timeline detallado (12 minutos)
- Scripts por sección
- Puntos clave a destacar
- 4 conclusiones preparadas

---

## 🎨 Características del Frontend

- **Diseño Femenino:** Colores pasteles (rosa, morado, etc.)
- **Responsive:** Se adapta a cualquier tamaño de pantalla
- **Moderno:** HTML5, CSS3, JavaScript ES6+
- **Interactivo:** Formularios dinámicos y validación cliente

### Secciones Principales
1. **Mis Looks** - Galería de looks creados
2. **Crear Look** - Formulario para nuevo look
3. **Login** - Autenticación de usuarios

---

## 🔧 Configuración Avanzada

### Cambiar Puerto
```javascript
// En backend/server.js
const PORT = 5000; // Cambiar a tu puerto deseado
```

### Habilitar Modo Headless en Pruebas
```javascript
// En tests/selenium_tests.js
options.addArguments('--headless'); // Descomenta esta línea
```

### Agregar Más Looks de Prueba
```javascript
// En backend/server.js
const looks = [
  // Agregar aquí más looks mock
];
```

---

## 📈 Próximos Pasos (Mejoras Futuras)

- [ ] Implementar base de datos real (MongoDB/PostgreSQL)
- [ ] Encriptación de contraseñas con bcrypt
- [ ] Sanitización contra XSS con DOMPurify
- [ ] Autenticación JWT robusta
- [ ] HTTPS/TLS
- [ ] Rate limiting
- [ ] Tests con Playwright para comparación
- [ ] Integración CI/CD con GitHub Actions
- [ ] Pruebas de carga con k6
- [ ] Cobertura de código

---

## 🐛 Debugging

### Si el backend no inicia
```bash
# Verificar puerto ocupado
netstat -ano | findstr :3000

# Matar proceso en ese puerto
taskkill /PID <PID> /F

# Reintentar
npm start
```

### Si las pruebas fallan
```bash
# Verificar que el backend esté corriendo
# Verificar que Chrome está instalado
# Revisar logs de error en la consola

# Ejecutar en modo verbose
NODE_DEBUG=* npm test
```

### Si la interfaz no carga
- Limpiar caché del navegador
- Verificar URL: http://localhost:3000
- Abrir DevTools (F12) para ver errores
- Revisar consola del backend

---

## 📖 Recursos de Aprendizaje

### Herramientas
- [Selenium WebDriver](https://www.selenium.dev/)
- [Playwright](https://playwright.dev/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Express.js](https://expressjs.com/)

### Vulnerabilidades
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE List](https://cwe.mitre.org/)
- [CVSS Calculator](https://www.first.org/cvss/)

### Testing
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

---

## 👥 Autoría y Créditos

**Proyecto:** LookMaker  
**Creado:** Noviembre 2024  
**Propósito:** Educativo (Actividad Académica)  

**Tecnologías Utilizadas:**
- Node.js & Express.js
- HTML5 & CSS3
- JavaScript (ES6+)
- Selenium WebDriver
- OWASP ZAP

---

## ⚖️ Licencia y Aviso Legal

Este es un proyecto educativo para demostración de conceptos.

**⚠️ NOTA IMPORTANTE:** 
- Este proyecto contiene vulnerabilidades **intencionales**
- **NO** usar en producción
- **NO** usar con datos reales o personales
- Solo para propósitos educativos y de demostra

ción

---

## 📞 Soporte

Para preguntas o problemas:
1. Revisar la documentación en `docs/`
2. Consultar los logs del terminal
3. Revisar DevTools (F12) en el navegador
4. Leer los comentarios en el código

---

## 🎓 Conclusiones Clave

**Por qué las pruebas automatizadas son importantes:**
1. Detectan bugs antes de producción
2. Ahorran tiempo en testing manual
3. Garantizan consistencia
4. Permiten refactorizar con confianza

**Por qué la seguridad es crítica:**
1. Los ataques tienen consecuencias reales
2. Las vulnerabilidades son costosas de reparar
3. La confianza del usuario es primordial
4. La seguridad es responsabilidad de todos

---

## 📸 Capturas de Pantalla

### Interfaz Principal
```
LookMaker - Interfaz limpia y moderna con tema de moda
Colores: Rosa, morado, blanco
Responsive: Se adapta a cualquier dispositivo
```

### Estructura de Datos
```
Look {
  id: number,
  nombre: string,
  descripcion: string,
  prendas: string[],
  ocacion: string,
  imagen: string
}
```

---

## 📝 Notas Finales

Este proyecto demuestra conceptos fundamentales en desarrollo web:
- **Frontend:** HTML/CSS/JS moderno
- **Backend:** API REST con Express
- **Testing:** Automatización con Selenium
- **Seguridad:** Vulnerabilidades comunes y soluciones

Todos estos conceptos son aplicables a aplicaciones reales en producción.

---

**Versión:** 1.0.0  
**Estado:** Completado ✅  
**Próxima Revisión:** Enero 2025

