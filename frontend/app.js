// ===== CONFIGURACIÓN =====
const API_URL = 'http://localhost:3000/api';

// ===== UTILIDADES =====
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ===== NAVEGACIÓN =====
function navigate(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    if (sectionId === 'looks') {
        document.getElementById('looks-section').classList.add('active');
        loadLooks();
    } else if (sectionId === 'crear') {
        document.getElementById('crear-section').classList.add('active');
    } else if (sectionId === 'login') {
        document.getElementById('login-section').classList.add('active');
    }
}

// Event listeners para navegación
document.getElementById('nav-looks').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('looks');
});

document.getElementById('nav-crear').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('crear');
});

document.getElementById('nav-login').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('login');
});

// ===== CARGA DE LOOKS =====
async function loadLooks() {
    try {
        const response = await fetch(`${API_URL}/looks`);
        const result = await response.json();
        
        if (result.success) {
            renderLooks(result.data);
        } else {
            showAlert('Error al cargar los looks', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión con el servidor', 'error');
    }
}

function renderLooks(looks) {
    const container = document.getElementById('looks-container');
    container.innerHTML = '';
    
    if (looks.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No hay looks aún. ¡Crea uno!</p>';
        return;
    }
    
    looks.forEach(look => {
        const card = document.createElement('div');
        card.className = 'look-card';
        card.id = `look-${look.id}`;
        
        const prendasHTML = look.prendas.map(prenda => `<li>${prenda}</li>`).join('');
        
        card.innerHTML = `
            <h3>${escapeHtml(look.nombre)}</h3>
            <span class="ocacion">${look.ocacion}</span>
            <p>${escapeHtml(look.descripcion)}</p>
            <div class="prendas-list">
                <strong>Prendas:</strong>
                <ul>
                    ${prendasHTML}
                </ul>
            </div>
            <div class="look-card-actions">
                <button class="btn-small btn-edit" onclick="editLook(${look.id})">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="deleteLook(${look.id})">🗑️ Eliminar</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ===== CREAR LOOK =====
document.getElementById('create-look-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const prendasString = document.getElementById('prendas').value;
    const ocacion = document.getElementById('ocacion').value;
    
    // Convertir string de prendas a array
    const prendas = prendasString.split(',').map(p => p.trim());
    
    try {
        const response = await fetch(`${API_URL}/looks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                prendas,
                ocacion
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('✨ Look creado exitosamente', 'success');
            document.getElementById('create-look-form').reset();
            setTimeout(() => navigate('looks'), 500);
        } else {
            showAlert(result.message || 'Error al crear el look', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
});

// ===== EDITAR LOOK =====
function editLook(id) {
    showAlert('⚙️ Función de edición en desarrollo', 'info');
}

// ===== ELIMINAR LOOK =====
async function deleteLook(id) {
    if (confirm('¿Estás segura de que deseas eliminar este look?')) {
        try {
            const response = await fetch(`${API_URL}/looks/${id}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                showAlert('🗑️ Look eliminado', 'success');
                document.getElementById(`look-${id}`).remove();
            } else {
                showAlert('Error al eliminar el look', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error de conexión', 'error');
        }
    }
}

// ===== REGISTRO =====
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('register-nombre').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('💖 ¡Bienvenida! Cuenta creada exitosamente', 'success');
            document.getElementById('register-form').reset();
        } else {
            showAlert(result.message || 'Error en el registro', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
});

// ===== LOGIN =====
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('🔓 ¡Sesión iniciada!', 'success');
            localStorage.setItem('token', result.token);
            document.getElementById('login-form').reset();
            setTimeout(() => navigate('looks'), 500);
        } else {
            showAlert(result.message || 'Error en el login', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
});

// ===== ESCAPE HTML (Protección contra XSS) =====
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

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 LookMaker app iniciada');
    navigate('looks');
});
