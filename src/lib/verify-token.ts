import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface TokenPayload {
  id: string;
}
export const verifyTokenSession = async(req: NextRequest) => {
  try {
    const token = req.cookies.get("assignment")?.value || "";
 if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized - token missing" }), { status: 401 });
  }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    return decodedToken.id;
  } catch (error) {
    console.log(error);
    
  }

};
