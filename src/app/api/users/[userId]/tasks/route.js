// localhost:3000/api/users/[userId]/tasks

import { Task } from "@/model/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    // get user using id
    
    const tasks = await Task.find({
      userId: userId,
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed To Fetch Task", success: false});;
  }
}
