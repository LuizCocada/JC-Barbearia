'use client'

import { UpdateState } from "@/actions/put/updateState";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "../components/(Dashboard)/DashboardPage";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { GetState } from "@/actions/get/getState";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import TimeTable from "../components/TimeTable";
import UnusualDayCard from "../components/UnusualDayCard";
import ListUnusualDayCard from "../components/ListUnusualDayCard";


const AdminPage = () => {

    const [checked, setChecked] = useState(false);
    const [newChecked, setNewChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect(() => {
        const fetchState = async () => {
            const state = await GetState();
            setChecked(state);
        };
        fetchState();
    }, []);

    const handleSwitchChange = (newChecked: boolean) => {
        setNewChecked(newChecked);
        setIsDialogOpen(true);
    }
    const handleConfirm = async () => {
        try {
            await UpdateState({ state: newChecked });
            setChecked(newChecked);
            setIsDialogOpen(false);
            toast.success(`Barbearia ${newChecked ? "aberta" : "fechada"} com sucesso.`);
        } catch (err) {
            toast.error("Error inesperado. Contate o suporte.");
            console.error(err);
        }
    }
    const handleCancel = () => {
        setIsDialogOpen(false);
    }

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
                    <Switch checked={checked} onCheckedChange={handleSwitchChange} />
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain>
                <div className="p-10 px-20">
                    {/* tabela de horarios fixos */}
                    <TimeTable />


                    <div className="flex gap-20 justify-around py-10 my-10 border-y border-gray-300">
                        <div className="w-full">
                            <p className="p-2 uppercase font-medium text-muted-foreground">
                                Adicionar dias incomuns
                            </p>
                            <UnusualDayCard />
                        </div>
                        <div className="w-full">
                            <p className="p-2 uppercase font-medium text-muted-foreground">
                                Lista de dias incomuns
                            </p>
                            <ListUnusualDayCard />
                        </div>
                    </div>
                </div>
            </DashboardPageMain>

            {/* abrir e fechar barbearia */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="font-bold">
                        Confirmar Ação
                    </AlertDialogHeader>
                    <AlertDialogTitle className="text-sm font-semibold">
                        Você tem certeza que deseja {newChecked ? "abrir" : "fechar"} a barbearia?
                    </AlertDialogTitle>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardPage>
    )
};

export default AdminPage;



