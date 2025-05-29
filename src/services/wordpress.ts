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

const WP_BASE = process.env.NEXT_PUBLIC_WP_API_URL!
  .replace("/wp-json/wp/v2", "");
const AUTH_TOKEN = process.env.WP_AUTH_TOKEN!;

let cachedToken = "";
let tokenExpiresAt = 0;

/** 1) Coge (ó reutiliza) el JWT cada 6 h */
async function getJwtToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    console.log("[getJwtToken] Reusing cached token");
    return cachedToken;
  }

  const [username, password] = Buffer.from(AUTH_TOKEN, "base64")
    .toString("utf-8")
    .split(":");

  console.log("[getJwtToken] Requesting new token with user:", username);

  const res = await axios.post(
    `${WP_BASE}/wp-json/jwt-auth/v1/token`,
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log("[getJwtToken] Token status:", res.status);

  if (res.status !== 200) throw new Error("No pude obtener el JWT");
  cachedToken = res.data.token;
  tokenExpiresAt = now + 6 * 60 * 60 * 1000;
  return cachedToken;
}


/** 2) Pide productos por categoría usando Bearer <token> */
export async function fetchProductsByCategory(categoryId: number): Promise<any[]> {
  console.log("[fetchProductsByCategory] Category ID:", categoryId);

  const token = await getJwtToken();
  console.log("[fetchProductsByCategory] Using token:", token.slice(0, 20) + "...");

  const res = await axios.get(`${WP_BASE}/wp-json/wc/v3/products`, {
    params: { category: categoryId },
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("[fetchProductsByCategory] Request URL:", res.request.path);
  console.log("[fetchProductsByCategory] Status:", res.status);
  console.log("[fetchProductsByCategory] Data:", res.data);

  if (res.status !== 200) throw new Error("Error cargando productos");
  return res.data;
}

