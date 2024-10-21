import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Service } from "@prisma/client";

interface ServiceItemProps {
    service: Service
}


const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card className="rounded-xl bg-muted-foreground">
            <CardContent className="flex items-center gap-3 p-3">
                <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
                    <Image alt={"alt"} src={"/bannerYellow.png"} fill className="object-cover rounded-lg" />
                </div>

                <div className="space-y-2 flex-1">
                    <div>
                        <h3 className="font-semibold text-sm text-background">{service.name}</h3>
                        <p className="text-sm text-gray-300">{service.description}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}
                        </p>
                        <Button className="rounded-xl font-semibold w-full" size="sm">
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;
