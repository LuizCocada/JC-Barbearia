'use client'

import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "../components/(Dashboard)/DashboardPage";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";


const AdminPage = () => {

    const [checked, setChecked] = useState(true);

    console.log(checked);

    return (
        <DashboardPage>
            <DashboardPageHeader className="gap-5 justify-between">
                <DashboardPageHeaderTitle>
                    Horários
                </DashboardPageHeaderTitle>
                <DashboardPageHeaderNav className="flex items-center gap-2 ">
                    <h2>
                        {checked ? "Fechar" : "Abrir"} Barbearia
                    </h2>
                    <Switch checked={checked} onCheckedChange={setChecked}/>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain>
                <div className="flex flex-col gap-5 justify-center items-center text-muted-foreground font-bold uppercase">
                    <h1>
                        Painel Administrativo
                    </h1>
                    <h1>
                        JC-Barbearia
                    </h1>
                </div>
            </DashboardPageMain>
        </DashboardPage>
    )
};

export default AdminPage;
