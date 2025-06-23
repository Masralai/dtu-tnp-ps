import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";

function generateUniqueIdForDb(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(request: NextRequest) {
  try {
    console.log("Request method:", request.method);
    const token = process.env.SHARE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
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
    );

    const data = response.data;
    if (!data.shareToken) {
      throw new Error("Invalid response: shareToken not found");
    }

    const uniqueId = generateUniqueIdForDb(); // Generate ID for DB

    console.log(
      `Storing uniqueId: ${uniqueId}, shareToken: ${data.shareToken} in DB`
    );

    const simulatedDbEntry = {
      uniqueId,
      shareToken: data.shareToken,
      createdAt: new Date().toISOString(),
    };
    console.log("Simulated DB storage:", simulatedDbEntry);

    return NextResponse.json({
      uniqueId,
      shareToken: data.shareToken,
    });
  } catch (error: unknown) {
    console.error("Generate link error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
