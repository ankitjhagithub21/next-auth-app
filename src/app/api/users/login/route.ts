import {connect} from "@/db/connection"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody;

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User not exist."},{status:400})
        }
        

        const validPassword = await bcryptjs.compare(password,user.password);


        if(!validPassword){
            return NextResponse.json({error:"Wrong email or password."},{status:400})
        }

        
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET!,{expiresIn:"1d"})


        const response =  NextResponse.json({
            message:"login successfull.",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response



    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
