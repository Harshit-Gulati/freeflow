import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.userFavorite.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error: any) {
    console.error("[FAVORITES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: boardId } = await context.params;

    const existingFavorite = await prisma.userFavorite.findFirst({
      where: {
        userId,
        boardId,
      },
    });

    if (existingFavorite)
      return NextResponse.json(
        { error: "Board already favorited!" },
        { status: 409 }
      );

    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board)
      return NextResponse.json({ error: "Board not found!" }, { status: 404 });

    const favorite = await prisma.userFavorite.create({
      data: {
        userId,
        boardId,
      },
    });

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error: any) {
    console.error("[FAVORITE_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const boardId = params.id;

    const existingFavorite = await prisma.userFavorite.findFirst({
      where: {
        userId,
        boardId,
      },
    });

    if (!existingFavorite)
      return NextResponse.json(
        { error: "Board not in favorites!" },
        { status: 404 }
      );

    await prisma.userFavorite.delete({
      where: { id: existingFavorite.id },
    });

    return NextResponse.json(
      { message: "Removed from favorites" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[FAVORITE_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
