import { auth } from "auth";
import axios from "axios";

export const GET = auth((req) => {
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
}) as any; // TODO: Fix `auth()` return type

export const POST = auth(async (req) => {
  if (req.auth?.user) {
    
    const { token } = req.auth.user;
  

    console.log({token})
    // const res = await axios.get('http://localhost:3000/oauth/logout', {
    //   headers: {
    //     Authorization: "Bearer " + token
    //   }
    // })

    // return Response.json({ data: res.data });
  }

  return Response.json({ data: "Protected data" });
});


