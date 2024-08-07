import type { NextRequest } from "next/server";

import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag") || "restaurants";
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret === process.env.REVALIDATE_SECRET) {
    console.log("revalidating routes");
    revalidateTag(tag);
    return Response.json({ success: true });
  }
  console.log("bad secret: ", secret);
  return Response.json({ success: false });
}
