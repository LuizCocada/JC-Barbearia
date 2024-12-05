'use client'

import { UpdateState } from "@/actions/put/updateState";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "../components/(Dashboard)/DashboardPage";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { GetState } from "@/actions/get/getState";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { AlarmClock, AlarmClockMinus, AlarmClockPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import HourCard from "../components/HourCard";
import TimeTable from "../components/TimeTable";


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
                {/* <div className="grid grid-cols-3 pt-5 border-t border-gray-700">
                    <HourCard
                        icon={<AlarmClock size={200} />}
                        description={"Atualize horários fixos."}
                        buttonText={"Remover"}
                    />
                    <HourCard
                        icon={<AlarmClockPlus size={200} />}
                        description={"Adicione horários fixos."}
                        buttonText={"Adicionar"}
                    />
                    <HourCard
                        icon={<AlarmClockMinus size={200} />}
                        description={"Remova horários fixos."}
                        buttonText={"Remover"}
                    />
                </div> */}
                <div className="p-10 px-20">
                    <TimeTable />
                </div>


            </DashboardPageMain>
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



