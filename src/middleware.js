import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // console.log("MiddleWare Executed");
    const authToken = await request.cookies.get("authToken")?.value;
    
    const loggedInUserNotAccessPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
    
    // public url
    if (request.nextUrl.pathname == '/api/login' || request.nextUrl.pathname === '/api/users') {
        return;
    }

    // if user already login and access login page
    if (loggedInUserNotAccessPath) {
        // not accessing secured route
        if (authToken) {
            // console.log("-->",request.url);
            return NextResponse.redirect(new URL('/profile/user', request.url))
        }
    }
    else{

        // accessing secured route
        if (!authToken) {
            // console.log(request.nextUrl.pathname);
            // if (request.nextUrl.pathname.startsWith("/api")) {
            //     return NextResponse.json({
            //         message: "Access Denied !!",
            //         success: false
            //     },{
            //         status:401
            //     })
            // }
            return NextResponse.redirect(new URL('/login', request.url))
        }
        else{
            // verify Token
            
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/add-task','/login','/signup' ,'/show-task', '/profile/:path*', '/', '/api/:path*'],
}

// /profile/:path* means all route which start with profile
// /add-task means only this inside this route is access