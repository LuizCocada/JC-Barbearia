import InputSearch from "@/components/InputSearch";
import ServiceItem from "@/components/ServiceItem";
import SheetComponent from "@/components/SheetComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface ServicesPageParams {
    searchParams: {
        title?: string
    }
}


const ServicesPage = async ({ searchParams }: ServicesPageParams) => {

    const services = await db.service.findMany({
        where: {
            name: {
                contains: searchParams.title,
                mode: "insensitive",
            },
        },
    })

    return (
        <div>
            <Card className="border-none rounded-none">
                <CardContent className="space-y-6 pt-5 pb-3">
                    <div className="flex justify-between pb-1 items-center">
                        <Link href={"/"}>
                            <Button size={"icon"} className="bg-popover text-secondary rounded-lg p-1" asChild>
                                <ChevronLeft />
                            </Button>
                        </Link>
                        <h2 className="text-lg font-semibold">Serviços</h2>
                        <SheetComponent />
                    </div>
                    <InputSearch />
                </CardContent>
            </Card>
            <p className="text-sm font-semibold px-5 pt-3 text-muted-foreground">
                Resultados para "{searchParams.title}"
            </p>
            <div className="p-6 space-y-3">
                {services.map((service) => (
                    <ServiceItem service={service} key={service.id} />
                ))}
            </div>
        </div>
    );
}

export default ServicesPage;