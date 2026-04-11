import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST() {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "products",
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return Response.json({ timestamp, signature });
}
