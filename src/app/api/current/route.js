import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { User } from "@/model/user";

export async function GET(request) {
    // console.log(request.cookies);
    const authToken = request.cookies.get('authToken')?.value;
    // console.log(authToken);
    const data = jwt.verify(authToken,process.env.JWT_KEY);
    // console.log(data);
    if (data._id) {
        try {
            const user = await User.findById(data._id);
            // console.log(user);
            if (user?._id) {
                return NextResponse.json({message:user, success:true});
            }
            else{
                return NextResponse.json({message:"user not exist", success:false});
            }
        } catch (error) {
            console.log("Invalid ", error);   
            return NextResponse.json({message:"Network Error !!", success:false});

        }
    }
    return NextResponse.json({message:"Invalid User !!", success:false});
}