import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ shapeId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shapeId } = await context.params;

    const { data } = await req.json();

    const shape = await prisma.canvasShape.update({
      where: { id: shapeId },
      data: {
        ...(data && { data }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(shape);
  } catch (error) {
    console.error("[SHAPE_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ shapeId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shapeId } = await context.params;

    await prisma.canvasShape.delete({
      where: { id: shapeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SHAPE_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
