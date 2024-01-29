import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { init } from "@/db/config";
// login user
export const POST = async (request) => {
    await init()
    const {email,password} = await request.json();
    // console.log(email,password);
    try {
        const user = await User.findOne({
            email:email
        })

        // if user not found
        if (user == null) {
            return NextResponse.json({
                message:"Invalid Email",
                success: false
            },{
                status:500,
            })    
        }
        
        // check password
        const matched = bcryptjs.compareSync(password, user.password);
        if (!matched) {
            return NextResponse.json({
                message:"Invalid Password",
                success: false
            },{
                status:500,
            })    
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name
        },process.env.JWT_KEY);

        // For Cookies --> https://nextjs.org/docs/app/api-reference/functions/cookies

        const response =  NextResponse.json({
            message:"Login Success !!",
            success: true
        })
        
        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly:true
        })

        return response;

    } catch (error) {
        return NextResponse.json({
            message:error.message,
            success: false
        },{
            status:500,
        })
    }
}