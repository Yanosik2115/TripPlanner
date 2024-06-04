import { cookies } from 'next/headers';

export default async function authenticate({ email, password }) {
  const nextCookies = cookies(); // Get cookies from request headers

  try {
    // Server-side fetch using an API route
    const response = await fetch('/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': nextCookies.toString(), // Pass cookies for authentication
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return true;
    }

    const errorResponse = await response.json();
    const error = new Error(errorResponse.message);
    error.response = errorResponse;
    throw error;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Authentication Error:", error.message);
    throw new Error("Failed to authenticate");
  }
}
