import { prisma } from "@/db/db.config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {

        const body = await req.json();
        const {email, password} = body;

        if(!email){
            return NextResponse.json('Email is required', {status: 400});
        };

        if(!password){
            return NextResponse.json('Password is required', {status: 400});
        };
  const checkUserExists = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!checkUserExists) {
      return NextResponse.json("User does not exits", {
        status: 400,
      });
    }
    if( checkUserExists.password !== password){
      return NextResponse.json("Invalid Password", { status: 400 });
    }
    const payload = { id: checkUserExists.id, email: checkUserExists.email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });


        const response = NextResponse.json(
      {
        message: "Login Successful",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("assignment", token, {
      path: "/",
      maxAge: 60 * 60, // 1 hour

      httpOnly: true,
      
    });
    return response;

    
    } catch (error) {
        console.log('Login error:', error);
        
        return NextResponse.json('Internal server error', {status: 500});
    }
}