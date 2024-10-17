import CategoryItem from "@/components/CategoryItem";
import InputSearch from "@/components/InputSerch";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/prisma";
import Image from "next/image";

const Home = async () => {


  const categorys = await db.category.findMany({})

  return (
    <div>
      <InputSearch />

      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold">
          Olá, Seja bem vindo!
        </h2>
        <p className="text-sm">
          Quarta, 16 de Outubro
        </p>
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