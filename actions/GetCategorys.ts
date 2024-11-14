"use server";

import { db } from "@/lib/prisma";

export const getCategorys = async () => {
  const category = await db.category.findMany({});

  category.map((category) => {
    category.imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      category.imageUrl
    )}`;
  });

  return category;
};
