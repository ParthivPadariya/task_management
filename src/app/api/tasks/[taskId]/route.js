// Dynamic Route

import { Task } from "@/model/task";
import { NextResponse } from "next/server";


// get particular task
// export async function GET(request,{params}) {
    
// }

// update task
// export async function PUT(request,{params}) {
    
// }

// delete task
export async function DELETE(request,{params}) {
    try {
        const {taskId} = params;
        // console.log(taskId);
        const result = await Task.deleteOne({_id: taskId});

        return NextResponse.json({message: result, success : true}, {status:200});
    } catch (error) {
        return NextResponse.json({message: "Task Not Delate", success : false}, {status:500});
        
    }
}