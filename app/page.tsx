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

      <div className="p-5">
        <h2 className="text-lg font-semibold text-primary">
          Olá, Seja bem vindo!
        </h2>
        <p className="text-sm">
          Quarta, 16 de Outubro
        </p>
      </div>

      <div className="border-b border-primary flex justify-center">

      </div>

      <div className="px-14 p-5 space-y-7">
        {categorys.map((category) => (
          <CategoryItem category={category} />
        ))}
      </div>
    </div>
  );
}


export default Home