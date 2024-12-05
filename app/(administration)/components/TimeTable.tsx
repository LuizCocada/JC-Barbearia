
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { addTimeAvailable } from "@/actions/create/addTimeAvailable";
import { toast } from "sonner";



const formSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Digite algo para buscar"
    }),
})

const TimeTable = () => {
    const [times, setTimes] = useState<Times[]>([]);
    const [loading, setLoading] = useState(true);
    const [sheetAddTimeIsOpen, setSheetAddTimeIsOpen] = useState(false);

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
    
    const handleSheetAddTimeOpen = () => {
        setSheetAddTimeIsOpen(true);
    };


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const newTimeAdded = `${data.title.slice(0, 2)}:${data.title.slice(2, 4)}`;
        try{
            await addTimeAvailable({time: newTimeAdded});
            toast.success("Horário adicionado com sucesso");
            setSheetAddTimeIsOpen(false);
            form.reset();

            const times = await getTimes();
            setTimes(times);
        } catch (err) {
            toast.error("Erro ao adicionar horário");
            console.error(err);
        }
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
                            <TableRow key={time.id}>
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
                        <SheetTitle className="border-b border-gray-300">
                            Adicionar um horário
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <InputOTP maxLength={4} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}
                                />
                                <Button type="submit" className="w-full p-5 mt-5">
                                    Adicionar
                                </Button>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

export default TimeTable;