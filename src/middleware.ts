
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function myMiddleware(request: NextRequest) {
   
    const protectedPaths = ["/profile", "/dashboard", "/settings"]; // Definir las rutas que requieren autenticación

    if (protectedPaths.includes(request.nextUrl.pathname)) {
        const cookie = request.cookies.get('jwt')

        if (!cookie) {
            // Si no hay token en la cookie, redirigir a otra ruta
            return NextResponse.redirect(new URL("/login", request.url));
        }

        console.log("pase");
        return NextResponse.next(); 
    }
    
    return NextResponse.next(); 
}

