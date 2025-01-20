import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const gender = url.searchParams.get("gender");
    console.log(gender);

    if (gender === "male") {
      return NextResponse.json({
        imageurl:
          "https://res.cloudinary.com/ducw7orvn/image/upload/v1724613750/WhatsApp_Image_2024-08-26_at_00.50.59_bdbc93fe_aydtcg.jpg",
      });
    } else if (gender === "female") {
      return NextResponse.json({
        imageurl:
          "https://res.cloudinary.com/ducw7orvn/image/upload/v1724613750/WhatsApp_Image_2024-08-26_at_00.51.59_fdcec28c_h4usiv.jpg",
      });
    } else {
      return NextResponse.json({
        imageurl:
          "https://res.cloudinary.com/ducw7orvn/image/upload/v1721941402/logo_dnkgj9.jpg",
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
