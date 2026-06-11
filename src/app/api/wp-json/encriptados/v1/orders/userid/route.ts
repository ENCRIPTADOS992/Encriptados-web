import { NextRequest } from "next/server";
import { proxyOrderPost } from "../proxyOrderRoute";

export async function POST(req: NextRequest) {
  return proxyOrderPost(req, "userid");
}
