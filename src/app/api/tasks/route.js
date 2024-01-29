import { Task } from "@/model/task";
import jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

// get all tasks
export async function GET() {
    
}

// create tasks
export async function POST(request) {
    // also write
    // const {} = request.body;
    const {title, content, status} = await request.json();
    // console.log("-->",title,content,status);
    
    // fetching current logged in user id
    const authToken = request.cookies.get("authToken")?.value;
    const data = jwt.verify(authToken, process.env.JWT_KEY);
    

    try {
        const task = new Task({
            title,
            content,
            userId: data._id ,
            status,
        })

        const createdTask = await task.save();
    
        return NextResponse.json(createdTask,{status:201, statusText:"task created"});
        
    } catch (error) {
        return NextResponse.json({
            message: "Fail to create task !! "+error,
            success: false
        })
    }
}