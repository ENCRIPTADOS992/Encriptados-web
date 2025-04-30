import axios from 'axios';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || ''; 
// O si tu variable no tiene NEXT_PUBLIC_:
const WP_AUTH_TOKEN = process.env.WP_AUTH_TOKEN || ''; 

export async function getPosts() {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      headers: {
        Authorization: `Basic ${WP_AUTH_TOKEN}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error en getPosts:', error.message);
    throw error;
  }
}
