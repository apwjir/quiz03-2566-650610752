import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Jiraphat Ponrat",
    studentId: "650610752",
  });
};
