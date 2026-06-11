import axios from 'axios';
import { WP_POSTS_API_BASE } from "@/shared/constants/backend";

const WP_AUTH_TOKEN = process.env.WP_AUTH_TOKEN || ''; 

export async function getPosts() {
  try {
    const response = await axios.get(`${WP_POSTS_API_BASE}/posts`, {
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
