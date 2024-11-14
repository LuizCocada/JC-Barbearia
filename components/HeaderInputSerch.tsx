"use client"

import { Calendar } from "lucide-react";
import SheetComponent from "./SheetComponent";
import InputSearch from "./InputSearch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";
import { useSession } from "next-auth/react";


const HeaderInputSearch = () => {

    const { data } = useSession();//user logado

    const formattedDate = format(new Date(), "EE, d 'de' MMMM", { locale: ptBR });
    const CapitalizeFirstStringOfDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <Card className="pt-3 text-background bg-foreground rounded-none rounded-b-md">
            <CardContent className="p-2 pb-5">
                <div className="py-3 px-2 flex justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold md:text-2xl">{data?.user ? `Seja bem vindo, ${data.user.name}!` : `Olá, seja bem vindo!`}</h2>
                        <p className="flex items-center gap-2 pt-2 md:text-xl">
                            {/* <Calendar size={15} className="text-primary" /> */}
                            <Calendar className="text-primary w-[15px] md:w-[20px] h-[15px] md:h-[20px]" />
                            {CapitalizeFirstStringOfDate}
                        </p>
                    </div>
                    <SheetComponent />
                </div>
                <div className="px-5">
                    <InputSearch />
                </div>
            </CardContent>
        </Card>
    );
}

export default HeaderInputSearch;
