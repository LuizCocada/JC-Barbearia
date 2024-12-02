
import ServiceItem from "@/components/ServiceItem";
import { db } from "@/lib/prisma";
import HeaderPageServices from "@/components/HeaderPageServices";
import { GetState } from "@/actions/get/getState";
import { CircleX } from "lucide-react";

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

    const state = await GetState();

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

            <div className="p-5 border-b border-gray-200 space-y-3">
                <h3 className="text- font-semibold">Observações</h3>
                <p className="text-sm text-justify">Trabalhamos com horários fixos, porém, dependendo do estilo de corte e/ou problemas externos, podem ocorrer variações de hórarios</p>
            </div>

            <div className="p-5 border-b border-gray-200 space-y-3">
                <h3 className="text-lg font-semibold pb-3">Serviços</h3>
                <div className="flex flex-col md:grid grid-cols-2 gap-4">
                    {state ? (
                        services.map((service) => (
                            <ServiceItem key={service.id} service={service} />
                        ))
                    ) : (
                        <div className="flex items-center gap-2 p-5 text-destructive text-xl">
                            <CircleX className="w-[25px] h-[25px] " />
                            <p>Barbearia está fechada...</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


export default Services