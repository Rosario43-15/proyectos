document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const password = document.getElementById('password').value;

  const user = { name, email, age, password };

  localStorage.setItem('user', JSON.stringify(user));

  alert('Registro exitoso! Puedes iniciar sesión ahora.');

  document.getElementById('registerForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';

    document.getElementById('userName').textContent = storedUser.name;
    document.getElementById('userEmail').textContent = storedUser.email;
    document.getElementById('userAge').textContent = storedUser.age;

    document.getElementById('userInfo').style.display = 'block';
  } else {
    alert('Correo o contraseña incorrectos.');
  }
});


document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('user');

  document.getElementById('userInfo').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'block';
});
