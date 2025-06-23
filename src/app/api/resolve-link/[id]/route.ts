import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface LinkData {
  shareToken: string;
  createdAt: string;
}

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

const storedLinks = new Map<string, LinkData>();

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const linkData: LinkData | undefined = storedLinks.get(id);

    if (!linkData) {
      return NextResponse.json(
        { error: "Invalid or expired link" },
        { status: 404 }
      );
    }

    console.log("Request method:", request.method);
    console.log(
      `Resolving link for ID: ${id} with shareToken: ${linkData.shareToken}`
    );

    const axiosResponse = await axios.get(
      `https://tnp-recruitment-challenge.manitvig.live/share`,
      {
        params: {
          shareToken: linkData.shareToken,
        },
      }
    );

    const students = axiosResponse.data;

    return NextResponse.json({ students });
  } catch (error: unknown) {
    console.error("Resolve link error:", error);

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        return NextResponse.json(
          { error: "Share token has expired" },
          { status: 401 }
        );
      } else {
        const errorMessage =
          error.response.data?.error || "Failed to fetch student data";
        return NextResponse.json(
          { error: errorMessage },
          { status: error.response.status || 500 }
        );
      }
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return NextResponse.json(
        { error: `Network error occurred: ${errorMessage}` },
        { status: 500 }
      );
    }
  }
}