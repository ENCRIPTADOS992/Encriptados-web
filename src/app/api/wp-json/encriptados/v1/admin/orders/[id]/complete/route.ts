import { NextRequest, NextResponse } from 'next/server';
import { requireBasicAuth } from '@/lib/auth';
import { adminCompleteSchema } from '@/lib/validation';
import { completeUserIdOrder } from '@/lib/services/adminService';

export async function POST(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    // auth
    const auth = req.headers.get('authorization') ?? undefined;
    requireBasicAuth(auth);

    // parse
    const body = await req.json();
    const parsed = adminCompleteSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message:'faltan campos' }, { status: 400 });

    const idNum = Number(params.id);
    if (!Number.isInteger(idNum)) return NextResponse.json({ message:'id inválido' }, { status: 400 });

    const { final_username, final_password } = parsed.data;
    const out = await completeUserIdOrder(idNum, final_username, final_password);
    return NextResponse.json(out);
  } catch (e:any) {
    if (e.status) return NextResponse.json(e.body ?? { message: e.message }, { status: e.status });
    return NextResponse.json({ message: e?.message ?? 'Server error' }, { status: 500 });
  }
}
