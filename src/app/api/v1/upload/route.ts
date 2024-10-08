/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: "dwehbmfy5",
  api_key: "514945648111989",
  api_secret: "TqcsTXDjrG97dk4B-WyvWYqq6GQ",
});

export const POST = async (req: NextRequest) => {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.pipe(uploadStream);
    });

    console.log(result);

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {}
};