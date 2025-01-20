import { NextResponse } from "next/server";
import { Parser } from "json2csv";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || "";

    if (!text) {
      throw new Error("Input text is empty.");
    }

    // Extract emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];

    if (emails.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No emails found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Count occurrences
    const emailCounts = emails.reduce((acc: Record<string, number>, email) => {
      acc[email] = (acc[email] || 0) + 1;
      return acc;
    }, {});

    // Format records for CSV
    const records = Object.entries(emailCounts).map(([email, count]) => ({
      email,
      count,
    }));

    // Generate CSV
    const csvParser = new Parser();
    const csvData = csvParser.parse(records);

    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="emails.csv"',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
