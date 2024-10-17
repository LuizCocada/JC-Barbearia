import CategoryItem from "@/components/CategoryItem";
import HeaderInputSearch from "@/components/HeaderInputSerch";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/prisma";
import Image from "next/image";

const Home = async () => {


  const categorys = await db.category.findMany({})

  return (
    <div>
      <HeaderInputSearch />

      <div className="px-10 p-5 space-y-7">
        {categorys.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}


export default Home