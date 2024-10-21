import CategoryItem from "@/components/CategoryItem";
import HeaderInputSearch from "@/components/HeaderInputSerch";
import { db } from "@/lib/prisma";
import Image from "next/image";

const Home = async () => {

  const categorys = await db.category.findMany({})

  return (
    <div className="">
      <HeaderInputSearch />
      <div className="relative w-full h-[250px]">
                <Image
                    src="/banner.jpg"
                    alt="banner"
                    fill
                    className="object-cover"
                />
            </div>
      <div className="px-10 p-5 space-y-7">
        {categorys.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}


export default Home