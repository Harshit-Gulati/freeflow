import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const board = await prisma.board.findUnique({
      where: { id },
    });

    if (!board)
      return NextResponse.json({ error: "Board not found" }, { status: 404 });

    return NextResponse.json(board, { status: 200 });
  } catch (error: any) {
    console.error("[GET_BOARD_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const boardId = id;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json(
        { error: "Title cannot be empty." },
        { status: 400 }
      );
    }

    if (title.length > 60) {
      return NextResponse.json(
        { error: "Title cannot be longer than 60 characters." },
        { status: 400 }
      );
    }

    const existingBoard = await prisma.board.findUnique({
      where: { id },
    });

    if (!existingBoard)
      return NextResponse.json({ error: "Board not found" }, { status: 404 });

    if (existingBoard.authorId !== userId)
      return NextResponse.json(
        { error: "You don't have permission to update this board" },
        { status: 403 }
      );

    const board = await prisma.board.update({
      where: { id: boardId },
      data: { title },
    });

    return NextResponse.json(board, { status: 200 });
  } catch (error: any) {
    console.error("[BOARD_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { userId } = await auth();
    const boardId = id;

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existingBoard = await prisma.board.findUnique({
      where: { id },
    });

    if (!existingBoard)
      return NextResponse.json({ error: "Board not found" }, { status: 404 });

    if (existingBoard.authorId !== userId)
      return NextResponse.json(
        { error: "You don't have permission to delete this board" },
        { status: 403 }
      );

    await prisma.$transaction(async (tx) => {
      await tx.userFavorite.deleteMany({
        where: { boardId: id },
      });

      await tx.canvasShape.deleteMany({
        where: { boardId: id },
      });

      await tx.board.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[BOARD_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to delete board" },
      { status: 500 }
    );
  }
}
