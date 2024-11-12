import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {


    const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(category.imageUrl)}`;

    return (
        <div className="flex flex-col items-center justify-center w-[300px]">
            <Link href={`/services/${category.id}`}>
                <Card className="rounded-full border-none shadow-2xl">
                    <CardContent className="rounded-full bg-primary p-0">
                        <div className="flex items-center justify-center p-3">
                            <Image src={svgDataUrl} alt={`${category.name} icon`} width={35} height={40} />
                        </div>
                    </CardContent>
                </Card>
            </Link>
            <p className="text-xs font-bold pt-1 md:text-sm">
                {category.name}
            </p>
        </div>
    );


}

export default CategoryItem;

