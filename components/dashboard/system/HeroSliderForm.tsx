"use client";

import ImagesGrid from "@/components/dashboard/products/ImagesGrid";
import ErrorMessage from "@/components/registration/ErrorMessage";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HeroSliderForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleUpload = async (files: FileList) => {
    const filesArray = Array.from(files);
    setUploadingCount(filesArray.length);

    const uploadPromises = filesArray.map(async (file) => {
      const sigRes = await fetch("/api/cloudinary-sign", { method: "POST" });
      const { timestamp, signature } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dga5szew1/image/upload",
        { method: "POST", body: formData },
      );

      const data = await res.json();
      return data.secure_url as string;
    });

    try {
      const urls = await Promise.all(uploadPromises);
      setImageUrls((prev) => [...prev, ...urls]);
    } catch {
      console.error("One or more uploads failed");
    } finally {
      setUploadingCount(0);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };
  return (
    <form action="">
      <div>
        {/* <ErrorMessage message={"dummy"} /> */}
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.[0]) handleUpload(e.target.files);
          }}
        />
        <input
          type="hidden"
          name="images"
          value={JSON.stringify(imageUrls ?? [])}
        />

        {uploadingCount > 0 && (
          <p className="text-sm text-muted-foreground">
            Uploading {uploadingCount} image(s)...
          </p>
        )}

        <ImagesGrid imageUrls={imageUrls} handleRemove={handleRemove} />
      </div>
    </form>
  );
}
