import { createCanvas } from "canvas";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || "Codesaarthi team";
  const color = url.searchParams.get("color") || "#22D3EE";
  
  try {
    if (!name) {
      return new Response(
        JSON.stringify({ error: "Name parameter is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate initials
    const words = name.split(" ");
    let initials = "";

    if (words.length === 1) {
      initials = words[0].charAt(0).toUpperCase();
    } else if (words.length === 2) {
      initials =
        words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else {
      initials =
        words[0].charAt(0).toUpperCase() +
        words[words.length - 1].charAt(0).toUpperCase();
    }

    // Canvas setup
    const canvasSize = 200;
    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw initials
    ctx.fillStyle = "white";
    ctx.font = "bold 5rem sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.fillText(initials, 0, 0);

    // Convert canvas to data URL
    const imageUrl = canvas.toDataURL();

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
