document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
    alert('Inicio de sesión exitoso!');

    window.location.href = "inicio.html";
  } else {
    alert('Correo o contraseña incorrectos.');
  }
});
