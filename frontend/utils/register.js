export default async function Register(user) {

  const res = await fetch('http://localhost:8080/api/v1/clients/register-client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'username': user.username,
      'email': user.email,
      'password': user.password,
    }),
  });
  console.log({ 'res': res });
  if (res.ok) {
    alert('Registration successful');
  } else {
    alert('Registration failed');
  }

}
