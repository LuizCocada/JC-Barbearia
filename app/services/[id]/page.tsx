
import SheetComponent from "@/components/SheetComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ServiceItem from "@/components/ServiceItem";
import { db } from "@/lib/prisma";
import HeaderPageServices from "@/components/HeaderPageServices";

interface ServicesParams {
    params: {
        id: string
    }
}

const Services = async ({ params }: ServicesParams) => {

    const services = await db.service.findMany({
        where: {
            categoryId: params.id
        },
        include: {
            category: true
        }
    })

    return (
        <div>
            {services.length > 0 &&
                <HeaderPageServices category={services[0].category} //se quebrar use o .map()
                />
            }
            {/* <div className="relative w-full h-[250px]">
                <Image
                    src="/banner.jpg"
                    alt="banner"
                    fill
                    className="object-cover"
                />
            </div> */}

            <div className="p-5 border-b-[0.1px] space-y-3">
                <h3 className="text- font-semibold">Observações</h3>
                <p className="text-sm text-justify">Trabalhamos com horários fixos, porém, dependendo do estilo de corte e/ou problemas externos, podem ocorrer variações de hórarios</p>
            </div>

            <div className="p-5 border-b-[0.1px] space-y-3">
                <h3 className="text-lg font-semibold pb-3">Serviços</h3>

                {services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}

            </div>
        </div>
    );
};


export default Services