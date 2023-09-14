import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  
  const rooms = [];
  let totalRooms = 0;
  for (const room of DB.rooms){
    totalRooms = totalRooms + 1;
    rooms.push({
      roomId: room.roomId,
      roomName: room.roomName,
    })
  }
  

  return NextResponse.json({
    ok: true,
    rooms,
    totalRooms,
  });
};

export const POST = async (request) => {
  const payload = checkToken();

  role = payload.role;

  if(role !== "ADMIN" || role !== "SUPER_ADMIN")
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const findRoom = DB.rooms.find((x) => x.roomName === roomName);
    if(findRoom)
      return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();
  
  DB.rooms.push({
    roomName,
    roomId,
  });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
