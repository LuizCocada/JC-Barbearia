import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    return (
        <div>
            <Link href={`/services/${category.id}`}>
                <Card className="rounded-3xl border-none shadow-2xl">
                    <CardContent className="bg-primary rounded-3xl py-0">
                        <div className="flex flex-col justify-center items-center h-[160px] ">
                            <Image src={"/cabelo.svg"} width={150} height={150} alt={"icone de cabelo"} />
                        </div>
                        <div className="flex justify-center">
                            <p className="text-2xl font-semibold border-t border-primary-foreground p-2">{category.name}</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
}

export default CategoryItem;