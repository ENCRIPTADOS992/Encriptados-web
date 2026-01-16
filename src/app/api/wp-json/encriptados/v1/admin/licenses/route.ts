import { NextRequest, NextResponse } from 'next/server';
import { requireBasicAuth } from '@/lib/auth';
import { adminAddLicensesSchema } from '@/lib/validation';
import { LicensesRepo } from '@/lib/repos/licensesRepo';

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization') ?? undefined;
    requireBasicAuth(auth);

    const body = await req.json();
    const parsed = adminAddLicensesSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'faltan campos', issues: parsed.error.flatten() }, { status: 400 });
    }

    const { product_id, licenses } = parsed.data;
    const out = LicensesRepo.add(product_id, licenses);
    return NextResponse.json(out);
  } catch (e: any) {
    if (e.status) return NextResponse.json(e.body ?? { message: e.message }, { status: e.status });
    return NextResponse.json({ message: e?.message ?? 'Server error' }, { status: 500 });
  }
}

