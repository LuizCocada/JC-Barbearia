"use server";

import { db } from "@/lib/prisma";

export const getCategorys = async () => {
  const categorys = await db.category.findMany({});

  categorys.forEach((category) => {
    category.imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      category.imageUrl
    )}`;
  });

  return categorys;
};



//busca as categorias