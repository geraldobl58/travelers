import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      roomId: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.roomId) {
      return new NextResponse("Room ID required", { status: 400 });
    }

    const room = await db.room.update({
      where: {
        id: params.roomId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      roomId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.roomId) {
      return new NextResponse("Room ID required", { status: 400 });
    }

    const room = await db.room.delete({
      where: {
        id: params.roomId,
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
