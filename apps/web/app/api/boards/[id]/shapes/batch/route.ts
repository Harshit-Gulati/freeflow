import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: boardId } = await context.params;
    const { shapes } = await req.json();

    const results = await Promise.all(
      shapes.map((s: any) => {
        if (s.isDeleted)
          return prisma.canvasShape.delete({ where: { id: s.id } });

        if (!s.data) return null;

        return prisma.canvasShape.upsert({
          where: { id: s.id },
          update: { data: s.data, updatedAt: new Date() },
          create: { id: s.id, boardId, data: s.data, createdBy: userId },
        });
      })
    );

    return NextResponse.json({ saved: results });
  } catch (error) {
    console.error("[SHAPES_BATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
