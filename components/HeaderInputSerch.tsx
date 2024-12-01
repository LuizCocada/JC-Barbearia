"use client"

import { Calendar } from "lucide-react";
import SheetComponent from "./SheetComponent";
import InputSearch from "./InputSearch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GetState } from "@/actions/(get)/getState";
import { Badge } from "./ui/badge";


const HeaderInputSearch = () => {
    const { data } = useSession();//user logado

    const [state, setState] = useState(true);
    useEffect(() => {
        const fetchState = async () => {
            const state = await GetState();
            setState(state);
        }
        fetchState();
    }, []);

    const formattedDate = format(new Date(), "EE, d 'de' MMMM", { locale: ptBR });
    const CapitalizeFirstStringOfDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <Card className="pt-6 rounded-none border-none">
            <CardContent className="p-2 pb-5 border-none">
                <div className="px-2 flex justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold md:text-2xl">{data?.user ? `Seja bem vindo, ${data.user.name}!` : `Olá, seja bem vindo!`}</h2>
                        <p className="flex items-center gap-2 pt-2 font-medium md:text-xl">
                            {/* <Calendar size={15} className="text-primary" /> */}
                            <Calendar className="text-primary w-[18px] md:w-[20px] h-[15px] md:h-[20px]" />
                            {CapitalizeFirstStringOfDate}
                        </p>
                        <div className="pt-3">
                            <Badge className={`rounded-xl font-semibold ${state ? "bg-green-600" : "bg-red-600"}`}>
                                {state ? 'Aberto' : 'Fechado'}
                            </Badge>
                        </div>
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
