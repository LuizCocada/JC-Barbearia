import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Prisma } from "@prisma/client";

interface BarberShopItemProps {
    service: Prisma.ServiceGetPayload<{
        include: {
            category: true;
        };
    }>;
}


const ServicesMain = ({ service }: BarberShopItemProps) => {
    return (

        <div className="items-center flex flex-col">
            <Card className="min-w-[90%] rounded-xl bg-card border-none p-2">
                <CardContent className="p-0 px-1 pt-1">

                    <div className="relative h-[200px] w-full">
                        <Image fill className="object-cover rounded" src={"/corteExemplo.png"} alt={service.name} />
                    </div>

                    <div className="px-1 py-3 ">
                        <h3 className="font-semibold truncate">{service.name}</h3>
                        <p className="text-sm truncate">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}
                        </p>
                        <Link href={`/services/${service.category.id}`}>
                            <Button className="w-full mt-3 font-semibold">
                                Reservar
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}

export default ServicesMain;
