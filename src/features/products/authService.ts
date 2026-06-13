/**
 * Auth service — obtains JWT token via server-side API route.
 * Credentials are kept on the server; the client only receives the token.
 */
export const getToken = async (): Promise<string> => {
  try {
    const response = await fetch("/api/auth/wp-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Auth failed with status ${response.status}`);
    }

    const { token } = await response.json();
    return token;
  } catch (error) {
    console.error("Error al obtener el token JWT");
    throw error;
  }
};
