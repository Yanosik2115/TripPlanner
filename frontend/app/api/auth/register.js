
export default async function register({ username, email, password }) {
  const response = await fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    return true;
  }

  const errorResponse = await response.json();
  const error = new Error(errorResponse.message);
  error.response = errorResponse;
  throw error;
}