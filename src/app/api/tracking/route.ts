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
  console.log("Tracking API called");
  try {
    const ip = request.headers.get("x-forwarded-for") || "8.8.8.8";
    const userAgent = request.headers.get("user-agent") || "";
 
    let locationData: ResponseData = {
      status: "success",
      city: "Localhost",
      country: "Local",
      region: "Local",
      regionName: "Local",
      countryCode: "LOC",
      lat: 0,
      lon: 0,
      timezone: "UTC",
      query: ip
    };
 
    if (!ip.includes("::1") && !ip.includes("127.0.0.1")) {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch IP address: ${response.statusText}`);
      }
      locationData = await response.json() as ResponseData;
    }

    const parser = new UAParser(userAgent);
    const deviceDetails = parser.getResult();
    const deviceModel = deviceDetails.device?.model || "Unknown Device";
    const browser = deviceDetails.browser.name;
    const os = deviceDetails.os.name;

    return NextResponse.json({
      ip,
      userAgent,
      browser,
      os,
      deviceModel,
      locationData,
    });
  } catch (error) {
    console.error("Error fetching login details:", error);
    return NextResponse.json({ error: "Failed to retrieve login details" }, { status: 500 });
  }
}