import { UAParser } from "ua-parser-js";
import fetch from "node-fetch";
import { NextRequest, NextResponse } from "next/server";

interface ResponseData {
  status: string;
  city: string;
  country: string;
  region: string;
  regionName: string;
  countryCode: string;
  lat: number;
  lon: number;
  timezone: string;
  query: string;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "8.8.8.8";
    const userAgent = request.headers.get("user-agent") || "";

    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch IP address: ${response.statusText}`);
    }

    const data: ResponseData = (await response.json()) as ResponseData;

    const locationData = data;
    const parser = new UAParser(userAgent);
    const deviceDetails = parser.getResult();
    const deviceModel = deviceDetails.device?.model || "Unknown Device";
    const browser = deviceDetails.browser.name;
    const os = deviceDetails.os.name;

    return {
      ip,
      userAgent,
      browser,
      os,
      deviceModel,
      locationData,
    };
  } catch (error) {
    console.error("Error fetching login details:", error);
    return NextResponse.json({ error: "Failed to retrieve login details" }, { status: 500 });
  }
}