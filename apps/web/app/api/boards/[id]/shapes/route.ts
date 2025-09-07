import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: boardId } = await context.params;

    const shapes = await prisma.canvasShape.findMany({
      where: { boardId },
    });

    return NextResponse.json(shapes);
  } catch (error) {
    console.error("[SHAPES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    const { data, shapeId } = await req.json();

    const shape = await prisma.canvasShape.create({
      data: {
        boardId,
        id: shapeId,
        data: data,
        createdBy: userId,
      },
    });

    return NextResponse.json(shape, { status: 201 });
  } catch (error) {
    console.error("[SHAPE_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
