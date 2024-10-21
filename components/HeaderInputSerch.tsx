"use client"

import { Calendar } from "lucide-react";
import SheetComponent from "./SheetComponent";
import InputSearch from "./InputSearch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


const HeaderInputSearch = () => {

    const formattedDate = format(new Date(), "EE, d 'de' MMMM", { locale: ptBR });
    const CapitalizeFirstStringOfDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <div className="p-3 pb-6 text-background bg-foreground">
            <div className="py-3 px-2 flex justify-between">
                <div>
                    <h2 className="text-xl font-bold">Olá, seja bem vindo!</h2>
                    <p className="text-sm flex gap-2 items-center pt-2">
                        <Calendar size={15} className="text-primary" />
                        {CapitalizeFirstStringOfDate}
                    </p>
                </div>
                <SheetComponent />
            </div>
            <InputSearch />
        </div>
    );
}

export default HeaderInputSearch;
