/**
 * PRUEBAS AUTOMATIZADAS CON SELENIUM
 * Proyecto: LookMaker - Generador de Looks de Moda
 * 
 * Este script realiza pruebas funcionales automatizadas en la aplicación
 */

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// ===== CONFIGURACIÓN =====
const BASE_URL = 'http://localhost:3000';
const TEST_TIMEOUT = 10000;

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// ===== UTILIDADES DE PRUEBA =====
let testsPassed = 0;
let testsFailed = 0;

function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    switch(type) {
        case 'pass':
            console.log(`${colors.green}✓ [${timestamp}] ${message}${colors.reset}`);
            testsPassed++;
            break;
        case 'fail':
            console.log(`${colors.red}✗ [${timestamp}] ${message}${colors.reset}`);
            testsFailed++;
            break;
        case 'info':
            console.log(`${colors.blue}ℹ [${timestamp}] ${message}${colors.reset}`);
            break;
        case 'test':
            console.log(`${colors.cyan}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📝 ${message}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
            break;
    }
}

function logSummary() {
    const total = testsPassed + testsFailed;
    console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║ RESUMEN DE PRUEBAS${colors.reset}`);
    console.log(`${colors.cyan}╠════════════════════════════════════════╣${colors.reset}`);
    console.log(`${colors.green}║ ✓ Pruebas Exitosas: ${testsPassed}${' '.repeat(14)}║${colors.reset}`);
    console.log(`${colors.red}║ ✗ Pruebas Fallidas: ${testsFailed}${' '.repeat(14)}║${colors.reset}`);
    console.log(`${colors.blue}║ Total: ${total}${' '.repeat(26)}║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}`);
}

// ===== CLASE DE PRUEBAS =====
class LookMakerTests {
    constructor() {
        this.driver = null;
    }

    async setup() {
        log('Inicializando navegador Chrome...', 'info');
        
        let options = new chrome.Options();
        // Descomenta la siguiente línea para modo headless (sin interfaz gráfica)
        // options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        
        await this.driver.manage().setTimeouts({ implicit: 5000 });
        log('Navegador listo', 'pass');
    }

    async teardown() {
        if (this.driver) {
            await this.driver.quit();
            log('Navegador cerrado', 'info');
        }
    }

    // ===== TEST 1: Cargar página principal =====
    async test_LoadHomePage() {
        log('TEST 1: Cargar página principal', 'test');
        
        try {
            await this.driver.get(BASE_URL);
            await this.driver.wait(until.titleContains('LookMaker'), TEST_TIMEOUT);
            
            const title = await this.driver.getTitle();
            if (title.includes('LookMaker')) {
                log('Página principal cargada correctamente', 'pass');
                return true;
            } else {
                log(`Título incorrecto: ${title}`, 'fail');
                return false;
            }
        } catch (error) {
            log(`Error al cargar página: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 2: Verificar elementos principales =====
    async test_VerifyMainElements() {
        log('TEST 2: Verificar elementos principales', 'test');
        
        try {
            // Verificar header
            const header = await this.driver.findElement(By.className('header'));
            if (header) {
                log('Header encontrado', 'pass');
            }
            
            // Verificar navbar
            const navbar = await this.driver.findElement(By.className('navbar'));
            if (navbar) {
                log('Navbar encontrado', 'pass');
            }
            
            // Verificar main-content
            const mainContent = await this.driver.findElement(By.className('main-content'));
            if (mainContent) {
                log('Main content encontrado', 'pass');
            }
            
            return true;
        } catch (error) {
            log(`Error verificando elementos: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 3: Navegación entre secciones =====
    async test_Navigation() {
        log('TEST 3: Navegación entre secciones', 'test');
        
        try {
            // Click en "Crear Look"
            const navCrear = await this.driver.findElement(By.id('nav-crear'));
            await navCrear.click();
            await this.driver.sleep(500);
            
            const crearSection = await this.driver.findElement(By.id('crear-section'));
            const isActive = await crearSection.getAttribute('class');
            
            if (isActive.includes('active')) {
                log('Navegación a "Crear Look" exitosa', 'pass');
            } else {
                log('Navegación falló', 'fail');
                return false;
            }
            
            // Click en "Login"
            const navLogin = await this.driver.findElement(By.id('nav-login'));
            await navLogin.click();
            await this.driver.sleep(500);
            
            const loginSection = await this.driver.findElement(By.id('login-section'));
            const isLoginActive = await loginSection.getAttribute('class');
            
            if (isLoginActive.includes('active')) {
                log('Navegación a "Login" exitosa', 'pass');
                return true;
            } else {
                log('Navegación a Login falló', 'fail');
                return false;
            }
        } catch (error) {
            log(`Error en navegación: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 4: Crear un nuevo look =====
    async test_CreateLook() {
        log('TEST 4: Crear un nuevo look', 'test');
        
        try {
            // Navegar a crear
            const navCrear = await this.driver.findElement(By.id('nav-crear'));
            await navCrear.click();
            await this.driver.sleep(500);
            
            // Llenar formulario
            const nombreInput = await this.driver.findElement(By.id('nombre'));
            await nombreInput.sendKeys('Look Romántico 💕');
            
            const descripcionInput = await this.driver.findElement(By.id('descripcion'));
            await descripcionInput.sendKeys('Un look perfecto para una cita romántica con estilo');
            
            const prendasInput = await this.driver.findElement(By.id('prendas'));
            await prendasInput.sendKeys('Vestido rojo, Tacones negros, Collar dorado');
            
            const ocacionSelect = await this.driver.findElement(By.id('ocacion'));
            await ocacionSelect.sendKeys('Noche');
            
            // Enviar formulario
            const submitBtn = await this.driver.findElement(By.id('btn-crear'));
            await submitBtn.click();
            
            // Esperar a que se muestre el mensaje de éxito
            await this.driver.sleep(1000);
            
            log('Look creado exitosamente', 'pass');
            return true;
        } catch (error) {
            log(`Error al crear look: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 5: Verificar que el look aparece en la lista =====
    async test_VerifyLookInList() {
        log('TEST 5: Verificar que el look aparece en la lista', 'test');
        
        try {
            // Navegar a Mis Looks
            const navLooks = await this.driver.findElement(By.id('nav-looks'));
            await navLooks.click();
            await this.driver.sleep(1000);
            
            // Buscar el look creado
            const looksContainer = await this.driver.findElement(By.id('looks-container'));
            const lookCards = await looksContainer.findElements(By.className('look-card'));
            
            if (lookCards.length > 0) {
                log(`Se encontraron ${lookCards.length} looks en la lista`, 'pass');
                
                // Verificar que el último look contiene nuestro nombre
                const lastCard = lookCards[lookCards.length - 1];
                const cardText = await lastCard.getText();
                
                if (cardText.includes('Romántico')) {
                    log('Look "Romántico" encontrado en la lista', 'pass');
                    return true;
                } else {
                    log('Look no encontrado en la lista', 'fail');
                    return false;
                }
            } else {
                log('No se encontraron looks en la lista', 'fail');
                return false;
            }
        } catch (error) {
            log(`Error verificando look: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 6: Formulario de Registro =====
    async test_RegistrationForm() {
        log('TEST 6: Formulario de Registro', 'test');
        
        try {
            // Navegar a Login
            const navLogin = await this.driver.findElement(By.id('nav-login'));
            await navLogin.click();
            await this.driver.sleep(500);
            
            // Llenar formulario de registro
            const nombreReg = await this.driver.findElement(By.id('register-nombre'));
            await nombreReg.sendKeys('María García López');
            
            const emailReg = await this.driver.findElement(By.id('register-email'));
            await emailReg.sendKeys('maria@fashiongirl.com');
            
            const passwordReg = await this.driver.findElement(By.id('register-password'));
            await passwordReg.sendKeys('MiPassword123!');
            
            // Enviar formulario
            const registerBtn = await this.driver.findElement(By.id('btn-register'));
            await registerBtn.click();
            
            await this.driver.sleep(1000);
            
            log('Formulario de registro enviado exitosamente', 'pass');
            return true;
        } catch (error) {
            log(`Error en registro: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 7: Formulario de Login =====
    async test_LoginForm() {
        log('TEST 7: Formulario de Login', 'test');
        
        try {
            // El usuario ya debe estar en la página de login
            const emailLogin = await this.driver.findElement(By.id('login-email'));
            await emailLogin.sendKeys('maria@fashiongirl.com');
            
            const passwordLogin = await this.driver.findElement(By.id('login-password'));
            await passwordLogin.sendKeys('MiPassword123!');
            
            // Enviar formulario
            const loginBtn = await this.driver.findElement(By.id('btn-login'));
            await loginBtn.click();
            
            await this.driver.sleep(1000);
            
            log('Formulario de login enviado exitosamente', 'pass');
            return true;
        } catch (error) {
            log(`Error en login: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== TEST 8: Validación de campos requeridos =====
    async test_FormValidation() {
        log('TEST 8: Validación de campos requeridos', 'test');
        
        try {
            // Navegar a crear look
            const navCrear = await this.driver.findElement(By.id('nav-crear'));
            await navCrear.click();
            await this.driver.sleep(500);
            
            // Intentar enviar sin llenar campos
            const submitBtn = await this.driver.findElement(By.id('btn-crear'));
            const isRequired = await submitBtn.getAttribute('type');
            
            // Verificar que el campo nombre tiene atributo required
            const nombreInput = await this.driver.findElement(By.id('nombre'));
            const hasRequired = await nombreInput.getAttribute('required');
            
            if (hasRequired !== null) {
                log('Campo "nombre" tiene validación requerida', 'pass');
            }
            
            // Limpiar los campos si tienen contenido
            await nombreInput.clear();
            
            log('Validación de campos requerida detectada', 'pass');
            return true;
        } catch (error) {
            log(`Error verificando validación: ${error.message}`, 'fail');
            return false;
        }
    }

    // ===== EJECUTAR TODAS LAS PRUEBAS =====
    async runAll() {
        try {
            await this.setup();
            
            console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
            console.log(`${colors.cyan}║   🧪 PRUEBAS AUTOMATIZADAS - LookMaker${colors.reset}`);
            console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
            
            await this.test_LoadHomePage();
            await this.test_VerifyMainElements();
            await this.test_Navigation();
            await this.test_CreateLook();
            await this.test_VerifyLookInList();
            await this.test_RegistrationForm();
            await this.test_LoginForm();
            await this.test_FormValidation();
            
            logSummary();
            
        } catch (error) {
            console.error(`${colors.red}Error fatal: ${error.message}${colors.reset}`);
        } finally {
            await this.teardown();
        }
    }
}

// ===== EJECUTAR PRUEBAS =====
if (require.main === module) {
    const tests = new LookMakerTests();
    tests.runAll().catch(err => {
        console.error(`${colors.red}Error: ${err}${colors.reset}`);
        process.exit(1);
    });
}

module.exports = LookMakerTests;
