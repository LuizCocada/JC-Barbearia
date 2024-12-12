'use client'

import { addUnusualDay } from '@/actions/create/addUnusualDay';
import { getTimes } from '@/actions/get/getTimes';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Times } from '@prisma/client';
import { set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarX2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from 'sonner';


const UnusualDayCard = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [timeList, setTimeList] = useState<Times[]>([])
    const [openOnDayBarberShop, setOpenOnDayBarberShop] = useState(false)
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<Times | undefined>(undefined)

    useEffect(() => {
        const fetch = async () => {
            const times = await getTimes()
            setTimeList(times)
        }
        fetch()
    }, [sheetOpen])

    const HandleSheetOpen = () => {
        setSheetOpen(true);
    }
    const HandleSheetOnOpenChange = () => {
        setSheetOpen(false);
        setSelectedDay(undefined);
        setSelectedTime(undefined);
        setOpenOnDayBarberShop(false);
    }

    const toggleBarbershopOnDayAndTime = () => {
        setOpenOnDayBarberShop(prevState => !prevState);
        setSelectedTime(undefined);
    }


    //horários e dia.
    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }
    const handleSelectTime = (time: Times) => {
        setSelectedTime(time)
    }

    //insere horas escolhidas no dia selecionado; caso sem time, seta 00:00
    const selectedDate = useMemo(() => {
        if (!selectedDay) return
        if (selectedDay && !selectedTime) return set(selectedDay, {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        })

        return set(selectedDay, {
            hours: Number(selectedTime?.time.split(':')[0]),
            minutes: Number(selectedTime?.time.split(':')[1]),
        })
    }, [selectedDay, selectedTime])

    const handleCreateUnusualDay = async () => {

        if (!selectedDate) return

        try {
            await addUnusualDay({ date: selectedDate })
            toast.success('Dia incomum criado com sucesso.')
        } catch (err) {
            console.error(err)
            toast.error('Erro ao criar dia incomum.')
        }
    }

    console.log(selectedDate)

    return (
        <div className="items-center flex flex-col">
            <div className="flex items-center flex-col w-full">
                <button onClick={HandleSheetOpen} className="w-full">
                    <Card className="w-full p-10 rounded-xl bg-card border-none hover:bg-gray-200 ">
                        <CardContent className="p-0 px-1 pt-1 ">
                            <div className="flex flex-col items-center text-center ">
                                <CalendarX2 size={150} className="text-gray-300" />
                            </div>
                        </CardContent>
                    </Card>
                </button>
            </div>

            <Sheet open={sheetOpen} onOpenChange={HandleSheetOnOpenChange}>
                <SheetContent className='flex flex-col rounded-l-3xl'>
                    <SheetHeader>
                        <SheetTitle className="border-b border-gray-300">
                            Gerenciar dias incomuns
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex justify-center border-b border-gray-300 py-5">
                        <Calendar
                            mode={"single"}
                            locale={ptBR}
                            selected={selectedDay}
                            onSelect={handleSelectDay}
                            fromDate={new Date()}
                        />
                    </div>
                    <div className='mt-3'>
                        {selectedDay && (
                            <>
                                <Button
                                    className={`w-full rounded-xl ${openOnDayBarberShop ? 'bg-black text-background' : 'bg-primary'}`}
                                    onClick={toggleBarbershopOnDayAndTime}
                                >
                                    Selecione horário de encerramento
                                </Button>
                                <div className='border-b border-gray-300 py-2 mx-14'></div>
                            </>
                        )}
                    </div>

                    {openOnDayBarberShop && (
                        <div className="flex flex-wrap gap-1.5 border-b border-gray-300 py-3">
                            {timeList.length > 0 ? (
                                timeList.map((time) =>
                                    <Button
                                        key={time.id}
                                        className='rounded-xl'
                                        variant={selectedTime == time ? "default" : "outline"}
                                        onClick={() => handleSelectTime(time)}
                                    >
                                        {time.time}
                                    </Button>
                                )
                            ) :
                                <p className="text-sm font-semibold text-destructive">
                                    {timeList.length <= 0 && "Não há horários fixos."}
                                </p>
                            }
                        </div>
                    )}

                    {selectedDate && (
                        <Card className='border-2  border-gray-300'>
                            <CardContent className='p-4 text-sm font-semibold'>
                                <div>
                                    {selectedDate && selectedDate.getHours() === 0 && selectedDate.getMinutes() === 0 ? (
                                        <span>
                                            Barbearia estará fechada&nbsp;
                                            <span
                                                className='underline'>{selectedDate.toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </span>
                                        </span>
                                    ) : (
                                        <span>
                                            Barbearia ficará aberta&nbsp;
                                            <span
                                                className='underline'>{selectedDate.toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </span>
                                            &nbsp;até as&nbsp;
                                            <span
                                                className='underline'>
                                                {selectedDate.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            </span>
                                            &nbsp;horas.
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}


                    {selectedDate && (
                        <div className="mt-auto">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-full rounded-xl font-semibold bg-green-600 text-background hover:bg-green-700 hover:text-background">
                                        Confirmar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-[90%] flex flex-col rounded-xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar dia incomum</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {selectedDate && selectedDate.getHours() === 0 && selectedDate.getMinutes() === 0 ?
                                                "Tem certeza que deseja fechar à barbearia " :
                                                "Tem certeza que deseja abrir à barbearia "
                                            }
                                            <span className='underline'>
                                                {selectedDate.toLocaleDateString('pt-BR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    weekday: 'long',
                                                }) + (selectedDate.getHours() !== 0 || selectedDate.getMinutes() !== 0 ? ' até as ' + selectedDate.toLocaleTimeString('pt-BR', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                }) : '')}
                                            </span>?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <div className="flex items-center gap-3">
                                            <AlertDialogCancel className="m-0 w-full rounded-xl">
                                                Voltar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                className="m-0 w-full rounded-xl bg-destructive text-background"
                                                onClick={handleCreateUnusualDay}
                                            >
                                                Confirmar
                                            </AlertDialogAction>
                                        </div>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div >
    );
};

export default UnusualDayCard;