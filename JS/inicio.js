function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function changeIframeSrc(src) {
    document.getElementById('laberintoIframe').src = src;
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        document.querySelectorAll('.dropdown-content').forEach(menu => {
            menu.style.display = 'none';
        });
    }
}

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLogoutButton = document.getElementById('loginLogoutButton');
    const userNameTitle = document.getElementById('userNameTitle');

    if (user) {
        userNameTitle.textContent = `Hola, ${user.name}`;
        loginLogoutButton.textContent = 'Cerrar sesión';
    } else {
        userNameTitle.textContent = 'Usuario';
        loginLogoutButton.textContent = 'Iniciar sesión';
    }
}

function toggleLoginLogout() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        localStorage.removeItem('user');
        alert('Has cerrado sesión.');
        window.location.reload();
    } else {
        // Redirigir al login
        window.location.href = 'login.html';
    }
}

checkLoginStatus();