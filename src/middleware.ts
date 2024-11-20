
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function myMiddleware(request: NextRequest) {
   
    const protectedPaths = ["/accounts","/register/username",
         "/dashboard", "/settings","/character","/register/account-ingame"]; 

    if (protectedPaths.includes(request.nextUrl.pathname)) {
        const cookie = request.cookies.get('token')

        if (!cookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next(); 
    }
    
    return NextResponse.next(); 
}

