import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import SheetComponent from "./SheetComponent";
import { Category } from "@prisma/client";

interface HeaderPageServicesProps {
    category: Category
}

const HeaderPageServices = ({ category }: HeaderPageServicesProps) => {
    return (
        <Card className="rounded-none border-none bg-card w-full">
            <CardContent className="flex items-center justify-between p-5">
                <Link href={"/"}>
                    <Button size={"icon"} className="bg-input rounded-lg p-1" asChild>
                        <ChevronLeft />
                    </Button>
                </Link>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <SheetComponent />
            </CardContent>
        </Card>
    );
}

export default HeaderPageServices;