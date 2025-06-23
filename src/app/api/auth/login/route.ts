import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

   if (username === "admin" && password === "admin") {

      const cookieStore = await cookies()
      cookieStore.set("admin-session", "authenticated", {
        httpOnly: true,
        sameSite: "lax",
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (_error) {
    console.error(_error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
