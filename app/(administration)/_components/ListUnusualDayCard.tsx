'use client'

import { deleteUnusualDays } from '@/actions/delete/deleteUnusualDays';
import { getTimes } from '@/actions/get/getTimes';
import { getUnusualDays } from '@/actions/get/getUnusualDays';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Times, UnusualDay } from '@prisma/client';
import { da } from 'date-fns/locale';
import { List, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';



const ListUnusualDayCard = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [unusualDays, setUnusualDays] = useState<UnusualDay[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [timeId, setTimeId] = useState<string>("");
    const [placeholderDay, setPlaceholderTime] = useState<Date>();

    useEffect(() => {
        const fetch = async () => {
            const Days = await getUnusualDays()
            setUnusualDays(Days)
        }
        fetch()
    }, [sheetOpen])


    const HandleSheetOpen = () => {
        setSheetOpen(true);
    }
    const HandleSheetOnOpenChange = () => {
        setSheetOpen(false);
    }

    const handleOpenDialogDeleteTime = (id: string, date: Date) => {
        setIsDialogOpen(true);
        setPlaceholderTime(date);
        setTimeId(id);
    };



    const handleCancelDeleteTime = () => {
        setIsDialogOpen(false);
        setPlaceholderTime(undefined);
        setTimeId("");
    }

    const handleConfirmDeleteTime = async (id: string) => {
        try {
            await deleteUnusualDays({ id: id });
            const days = await getUnusualDays();
            setIsDialogOpen(false);
            setUnusualDays(days);
            setPlaceholderTime(undefined);
            toast.success("dia incomum excluído com sucesso.");
        } catch (err) {
            toast.error("Error ao excluir dia incomum.");
            console.error(err);
        }
    }




    return (
        <div className="flex items-center flex-col w-full">
            <button onClick={HandleSheetOpen} className="w-full">
                <Card className="w-full p-10 rounded-xl bg-card border-none hover:bg-gray-200">
                    <CardContent className="p-0 px-1 pt-1">
                        <div className="flex flex-col items-center text-center">
                            <List size={150} className="text-gray-300" />
                        </div>
                    </CardContent>
                </Card>
            </button>


            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className='flex flex-col rounded-t-3xl h-[90%]' side={'bottom'}>
                    <SheetHeader className='border-b border-gray-300'>
                        <SheetTitle>
                            Dias incomuns
                        </SheetTitle>
                    </SheetHeader>
                    <div className="p-10">
                        <Table>
                            <TableCaption>Lista de dias incomuns</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Dias</TableHead>
                                    <TableHead>Abre</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className='pl-8'>
                                        <Trash2 size={17} />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {unusualDays
                                    .sort((a, b) => new Date(a.open).getTime() - new Date(b.open).getTime())
                                    .map((day) => (
                                        <TableRow key={day.id}>
                                            <TableCell className="font-medium">
                                                {day.open.toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell>
                                            <TableCell className='font-medium'>
                                                {day.close.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                }) === '00:00' ? <span className='text-muted-foreground'>Fechado</span> : day.open.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className='font-medium'>
                                                {day.close.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                }) === '00:00' ? <span className='text-muted-foreground'>Fechado</span> : day.close.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={() => handleOpenDialogDeleteTime(day.id, day.open)}>
                                                    <p className='text-xs font-bold text-destructive'>
                                                        Remover
                                                    </p>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="p-10 mt-auto">
                        <Button
                            onClick={HandleSheetOnOpenChange}
                            variant={"destructive"}
                            className='w-full font-semibold'
                        >
                            Fechar
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="font-bold border-b border-gray-200">
                        Excluir horário
                    </AlertDialogHeader>
                    <AlertDialogTitle className="text-sm font-semibold">
                        <span className="font-normal">Você tem certeza que deseja excluir o horário de</span> {placeholderDay && `${placeholderDay.toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            weekday: 'long',
                        })} ${placeholderDay.toLocaleTimeString('pt-BR', {
                            hour: 'numeric',
                            minute: 'numeric',
                        }) === '00:00' ? 'Fechado' : placeholderDay.toLocaleTimeString('pt-BR', {
                            hour: 'numeric',
                            minute: 'numeric',
                        })}`}?
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
    );
};

export default ListUnusualDayCard;