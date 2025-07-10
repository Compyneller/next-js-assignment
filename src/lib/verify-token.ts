import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface TokenPayload {
  id: string;
}
export const verifyTokenSession = async(req: NextRequest) => {
  try {
    const token = req.cookies.get("assignment")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
   console.log('Decoded user ID:', decodedToken.id);

    return decodedToken.id;
  } catch (error) {
    console.log(error);
    
  }

};
