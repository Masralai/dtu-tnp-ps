import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

const linkMappings = new Map<string, { shareToken: string; createdAt: string }>()

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.SHARE_TOKEN
    
    if (!token) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }


    const response = await axios.post(
      "https://tnp-recruitment-challenge.manitvig.live/share",
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, 
      }
    )

    
    const data = response.data

    
    if (!data.shareToken) {
      throw new Error("Invalid response: shareToken not found")
    }

    
    const uniqueId = generateUniqueId()

   
    linkMappings.set(uniqueId, {
      shareToken: data.shareToken,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      uniqueId,
      shareToken: data.shareToken,
    })
  } catch (error: unknown) {
    console.error("Generate link error:", error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
       
        const status = error.response.status
        const errorMessage = error.response.data?.error || error.response.data?.message || "API request failed"
        
        if (status === 401) {
          return NextResponse.json({ error: "Token expired or invalid" }, { status: 401 })
        } else if (status === 403) {
          return NextResponse.json({ error: "Access denied" }, { status: 403 })
        } else {
          return NextResponse.json({ error: errorMessage }, { status })
        }
      } else if (error.request) {
      
        return NextResponse.json({ error: "Network error: No response from server" }, { status: 503 })
      }
    }

    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}


export { linkMappings }