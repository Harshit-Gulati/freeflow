import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
];

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const authorName = user.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : user.username || "Unknown";

    const body = await req.json();
    const { orgId, title } = body;

    if (!orgId || typeof orgId !== "string" || orgId.trim().length === 0) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (title.trim().length > 60) {
      return NextResponse.json(
        { error: "Title cannot be longer than 60 characters" },
        { status: 400 }
      );
    }

    const userOrgMemberships = await client.users.getOrganizationMembershipList(
      {
        userId,
      }
    );

    const isOrgMember = userOrgMemberships.data.some(
      (membership) => membership.organization.id === orgId
    );

    if (!isOrgMember) {
      return NextResponse.json(
        { error: "You don't have access to this organization" },
        { status: 403 }
      );
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await prisma.board.create({
      data: {
        title: title.trim(),
        orgId: orgId.trim(),
        authorId: userId,
        authorName,
        imageUrl: randomImage as string,
      },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (err) {
    console.error("[BOARD_CREATE_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId");
    const search = searchParams.get("search");
    const favorites = searchParams.get("favorites");

    if (!orgId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const userOrgMemberships = await client.users.getOrganizationMembershipList(
      {
        userId,
      }
    );

    const isOrgMember = userOrgMemberships.data.some(
      (membership) => membership.organization.id === orgId
    );

    if (!isOrgMember) {
      return NextResponse.json(
        { error: "You don't have access to this organization" },
        { status: 403 }
      );
    }

    const boards = await prisma.board.findMany({
      where: {
        orgId,
        ...(search && {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }),
        ...(favorites === "true" && {
          favorites: {
            some: {
              userId,
            },
          },
        }),
      },
      include: {
        favorites: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const boardsWithFavorites = boards.map((board) => ({
      ...board,
      isFavorite: board.favorites.length > 0,
      favorites: undefined,
    }));

    return NextResponse.json(boardsWithFavorites);
  } catch (err) {
    console.error("[BOARDS_GET_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
