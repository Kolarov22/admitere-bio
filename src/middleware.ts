export { auth as middleware } from "@/auth"



export const config = {
  matcher: ["/my-courses/:path*", "/cart", ],
}