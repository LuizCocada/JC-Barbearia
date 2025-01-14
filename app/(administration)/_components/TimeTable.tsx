
import { getTimes } from "@/actions/get/getTimes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Times } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddTimeForm from "./AddTimeForm";
import UpdateTimeForm from "./UpdateTimeForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteTimeAvailable } from "@/actions/delete/deleteTimeAvailable";
import { toast } from "sonner";

const TimeTable = () => {

    const [times, setTimes] = useState<Times[]>([]);
    const [timeId, setTimeId] = useState<string>("");
    const [placeholderTime, setPlaceholderTime] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sheetAddTimeIsOpen, setSheetAddTimeIsOpen] = useState(false);
    const [sheetUpdateTimeIsOpen, setSheetUpdateTimeIsOpen] = useState(false);


    //busca os horários fixos disponíveis.
    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const times = await getTimes();
                setTimes(times);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchTimes();
    }, []);

    const handleSheetAddTimeOpen = () => {
        setSheetAddTimeIsOpen(true);
    };

    const handleSheetUpdateTimeOpen = (id: string, time: string) => {
        setTimeId(id);
        setPlaceholderTime(time);
        setSheetUpdateTimeIsOpen(true);
    };

    //fecha o sheet e atualiza a lista de horários
    const handleAddTime = async () => {
        setSheetAddTimeIsOpen(false);
        const times = await getTimes();
        setTimes(times);
    };

    const handleUpdateTime = async () => {
        setSheetUpdateTimeIsOpen(false);
        setTimeId("");
        const times = await getTimes();
        setTimes(times);
    };

    //####DELETAR HORARIO######
    const handleOpenDialogDeleteTime = (id: string, time: string) => {
        setIsDialogOpen(true);
        setPlaceholderTime(time);
        setTimeId(id);
    };
    const handleConfirmDeleteTime = async (id: string) => {
        try {
            await deleteTimeAvailable({ id: id });
            const times = await getTimes();
            setTimes(times);
            setIsDialogOpen(false);
            toast.success("Horário excluído com sucesso.");
        } catch (err) {
            toast.error("Error ao excluir horário.");
            console.error(err);
        }
    }
    const handleCancelDeleteTime = () => {
        setIsDialogOpen(false);
        setPlaceholderTime("");
        setTimeId("");
    }
    //#######################


    return (
        <div className="border-2 border-gray-300 rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80%]">
                            <div className="flex items-center gap-5">
                                Horários disponíveis
                                <Button className="h-6 w-8 rounded-lg" onClick={handleSheetAddTimeOpen}>
                                    <Plus size={18} />
                                </Button>
                            </div>
                        </TableHead>
                        <TableHead>Editar</TableHead>
                        <TableHead>Excluir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (<TableRow><TableCell>Carregando...</TableCell></TableRow>) : (
                        times.map((time) => (
                            <TableRow key={time.id}>
                                <TableCell className="font-medium">{time.time}</TableCell>
                                <TableCell>
                                    <Button variant={"link"} onClick={() => handleSheetUpdateTimeOpen(time.id, time.time)}>
                                        <Pencil size={18} className="text-muted-foreground" />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant={"link"} onClick={() => handleOpenDialogDeleteTime(time.id, time.time)}>
                                        <Trash2 size={18} className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* adicionar horarios */}
            <Sheet open={sheetAddTimeIsOpen} onOpenChange={setSheetAddTimeIsOpen}>
                <SheetContent className="rounded-b-3xl" side={"top"}>
                    <SheetHeader>
                        <SheetTitle className="border-b border-gray-300">
                            Adicionar horário
                        </SheetTitle>
                    </SheetHeader>

                    <div className="pt-5">
                        <AddTimeForm onSuccessAddTime={handleAddTime} />
                    </div>
                </SheetContent>
            </Sheet>

            {/* atualizar horarios */}
            <Sheet open={sheetUpdateTimeIsOpen} onOpenChange={setSheetUpdateTimeIsOpen}>
                <SheetContent className="rounded-b-3xl" side={"top"}>
                    <SheetHeader>
                        <SheetTitle className="border-b border-gray-300">
                            Atualizar horário
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-5">
                        <UpdateTimeForm onSuccessUpdateTime={handleUpdateTime} id={timeId} placeholder={placeholderTime || ""} />
                    </div>
                </SheetContent>
            </Sheet>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="font-bold border-b border-gray-200">
                        Excluir horário
                    </AlertDialogHeader>
                    <AlertDialogTitle className="text-sm font-semibold">
                    <span className="font-normal">Você tem certeza que deseja excluir o horário de</span> ({placeholderTime})?
                    </AlertDialogTitle>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDeleteTime}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-background hover:bg-destructive hover:text-background"
                            onClick={() => handleConfirmDeleteTime(timeId)}
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
};

export default TimeTable;