// src/app/api/cripto/cryptomus-process/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiUrl = process.env.API_CRYPTO_MUS!;
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: await req.arrayBuffer(), // correcto para bodies binarios
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error en API proxy:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
