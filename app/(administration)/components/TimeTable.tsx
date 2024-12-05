
import { getTimes } from "@/actions/get/getTimes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Times } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const TimeTable = () => {

    const [times, setTimes] = useState<Times[]>([]);
    const [loading, setLoading] = useState(true);
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

    const [sheetAddTimeIsOpen, setSheetAddTimeIsOpen] = useState(false);

    const handleSheetAddTimeOpen = () => {
        setSheetAddTimeIsOpen(true);
    };

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
                            <TableRow>
                                <TableCell className="font-medium">{time.time}</TableCell>
                                <TableCell>
                                    <Button variant={"link"}>
                                        <Pencil size={18} className="text-muted-foreground" />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant={"link"}>
                                        <Trash2 size={18} className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Sheet open={sheetAddTimeIsOpen} onOpenChange={setSheetAddTimeIsOpen}>
                <SheetContent className="rounded-b-3xl" side={"top"}>
                    <SheetHeader>
                        <SheetTitle>
                            Adicionar um horário
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-5">
                    
                        <Button className="w-full mt-5">Adicionar</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

export default TimeTable;