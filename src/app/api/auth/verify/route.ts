import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    console.log("Request method:", request.method);

    if (session?.value === "authenticated") {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
