// src/app/api/cripto/cryptomus-process.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const apiUrl = process.env.API_CRYPTO_MUS!;
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: req.body,   
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Error en API proxy:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
