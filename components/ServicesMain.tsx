import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Prisma, Service } from "@prisma/client";

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
            <Card className="min-w-[90%] rounded-xl bg-popover p-2 ">
                <CardContent className="p-0 px-1 pt-1">

                    <div className="relative h-[200px] w-full">
                        <Image fill className="object-cover rounded" src={"/bannerYellow.png"} alt={service.name} />

                        <Badge className="absolute top-2 left-2" variant="secondary">
                            <StarIcon className="text-primary fill-primary" size={12} />
                            <p className="pl-1 text-xs font-semibold">5,0</p>
                        </Badge>
                    </div>

                    <div className="px-1 py-3 ">
                        <h3 className="font-semibold text-background truncate">{service.name}</h3>
                        <p className="text-sm truncate font-bold text-primary">
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
