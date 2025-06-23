import { type NextRequest, NextResponse } from "next/server"
import { linkMappings } from "../../generate-link/route"
import axios from "axios" 
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const uniqueId = params.id

 
    const linkData =  linkMappings.get(uniqueId)

    if (!linkData) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 })
    }

    
    const axiosResponse = await axios.get(
      `https://tnp-recruitment-challenge.manitvig.live/share`,
      {
        params: {
          shareToken: linkData.shareToken, 
        },
      }
    )

   
    const students = axiosResponse.data

    return NextResponse.json({ students })

  } catch (error: any) { 
    console.error("Resolve link error:", error)

    
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        
        const uniqueId = params.id; 
        linkMappings.delete(uniqueId)
        return NextResponse.json({ error: "Share token has expired" }, { status: 401 })
      } else {
        
        const errorMessage = error.response.data?.error || "Failed to fetch student data";
        return NextResponse.json({ error: errorMessage }, { status: error.response.status || 500 })
      }
    } else {
    
      return NextResponse.json({ error: "Network error occurred" }, { status: 500 })
    }
  }
}