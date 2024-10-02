import {connect} from "@/db/connection"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function GET(request:NextRequest) {
    try{
       
        const userId = await getDataFromToken(request)

        const user = await User.findById(userId).select("-password")

        return NextResponse.json({user})

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
