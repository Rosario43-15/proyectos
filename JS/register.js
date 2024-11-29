document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
  
    const user = { name, email, age, password };
  
    localStorage.setItem('user', JSON.stringify(user));
  
    alert('Registro exitoso! Ahora puedes iniciar sesión.');
  
    document.getElementById('registerForm').reset();
  });
  