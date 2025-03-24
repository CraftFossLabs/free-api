import { NextRequest, NextResponse } from "next/server";
import addressData from "@/data/AddressData.json";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase() || '';

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    // Filter states based on the search query
    const matchingStates = addressData.filter(state =>
      state.state.toLowerCase().includes(query)
    );

    // Return matching states with their districts
    return NextResponse.json({
      states: matchingStates.map(state => ({
        name: state.state,
        districtCount: state.count,
        districts: state.districts
      }))
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
