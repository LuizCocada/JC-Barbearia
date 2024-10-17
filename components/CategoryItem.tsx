import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Category } from "@prisma/client";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <Card>
            <CardContent className="bg-primary p-2 rounded-3xl">
                <div className="flex flex-col justify-center items-center h-[160px]">
                    <Image src={"/cabelo.svg"} width={150} height={150} alt={"icone de cabelo"} />
                    <p className="text-2xl font-semibold text-secondary">{category.name}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default CategoryItem;