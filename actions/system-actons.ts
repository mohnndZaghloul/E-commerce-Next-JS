"use server";

import { unauthorized } from "next/navigation";
import { getRole } from "./customers-actions";

export const updateHeroSlider = async (prevState: any, formData: FormData) => {
  const role = await getRole();
  if (role !== "ADMIN") {
    unauthorized();
  }
  const images = JSON.parse((formData.get("images") as string) || "[]");
  //still updated
};
