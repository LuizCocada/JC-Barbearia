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
    const [selectedOpenTime, setSelectedOpenTime] = useState<Times | undefined>(undefined)
    const [selectedCloseTime, setSelectedCloseTime] = useState<Times | undefined>(undefined)
    const [selectingOpenTime, setSelectingOpenTime] = useState(true)

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
        setSelectedOpenTime(undefined);
        setSelectedCloseTime(undefined);
        setOpenOnDayBarberShop(false);
        setSelectingOpenTime(true);
    }

    const toggleBarbershopOnDayAndTime = () => {
        setOpenOnDayBarberShop(prevState => !prevState);
        setSelectedOpenTime(undefined);
        setSelectedCloseTime(undefined);
        setSelectingOpenTime(true);
    }

    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleSelectTime = (time: Times) => {
        if (selectingOpenTime) {
            setSelectedOpenTime(time)
            setSelectingOpenTime(false)
        } else {
            setSelectedCloseTime(time)
        }
    }

    const selectedOpenDate = useMemo(() => {
        if (!selectedDay) return
        if (selectedDay && !selectedOpenTime) return set(selectedDay, {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        })

        return set(selectedDay, {
            hours: Number(selectedOpenTime?.time.split(':')[0]),
            minutes: Number(selectedOpenTime?.time.split(':')[1]),
        })
    }, [selectedDay, selectedOpenTime])

    const selectedCloseDate = useMemo(() => {
        if (!selectedDay) return
        if (selectedDay && !selectedCloseTime) return set(selectedDay, {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        })

        return set(selectedDay, {
            hours: Number(selectedCloseTime?.time.split(':')[0]),
            minutes: Number(selectedCloseTime?.time.split(':')[1]),
        })
    }, [selectedDay, selectedCloseTime])

    const handleCreateUnusualDay = async () => {
        if (!selectedOpenDate || !selectedCloseDate) return

        try {
            await addUnusualDay({
                open: selectedOpenDate,
                close: selectedCloseDate
            })
            toast.success('Dia incomum criado com sucesso.')
        } catch (err) {
            console.error(err)
            toast.error('Erro ao criar dia incomum.')
        }
    }

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
                                    {selectingOpenTime ? 'Selecione horário de abertura' : 'Selecione horário de fechamento'}
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
                                        className={`rounded-xl hover:bg-yellow-300 ${selectedOpenTime === time ? 'bg-green-500 text-white' : selectedCloseTime === time ? 'bg-red-500 text-white' : 'default'}`}
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

                    {selectedOpenDate && selectedCloseDate && (
                        <Card className='border-2 border-gray-300'>
                            <CardContent className='p-4 text-sm font-semibold'>
                                {selectedOpenTime || selectedCloseTime ? (
                                    <span>
                                        Abrirá&nbsp;
                                        <span className='underline'>
                                            {selectedOpenDate.toLocaleDateString('pt-BR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                weekday: 'long',
                                            })}
                                        </span>
                                        &nbsp;das&nbsp;
                                        <span className='underline'>
                                            {selectedOpenDate.toLocaleTimeString('pt-BR', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </span>
                                        &nbsp;às&nbsp;
                                        <span className='underline'>
                                            {selectedCloseDate.toLocaleTimeString('pt-BR', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </span>
                                        &nbsp;horas.
                                    </span>
                                ) : (
                                    <span>
                                        Barbearia estará fechada o dia todo na&nbsp;
                                        <span className='underline'>
                                            {selectedOpenDate?.toLocaleDateString('pt-BR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                weekday: 'long',
                                            })}
                                        </span>.
                                    </span>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {selectedOpenDate && selectedCloseDate && (
                        <div className="mt-auto">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="w-full rounded-xl font-semibold bg-green-600 text-background hover:bg-green-700 hover:text-background"
                                        disabled={openOnDayBarberShop ? !selectedOpenTime || !selectedCloseTime : false}
                                    >
                                        Confirmar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-[90%] flex flex-col rounded-xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar dia incomum</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {selectedOpenTime && selectedCloseTime ? (
                                                <>
                                                    Tem certeza que deseja abrir à barbearia&nbsp;
                                                    <span className='underline'>
                                                        {selectedOpenDate.toLocaleDateString('pt-BR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            weekday: 'long',
                                                        })}
                                                    </span>
                                                    &nbsp;de&nbsp;
                                                    <span className='underline'>
                                                        {selectedOpenDate.toLocaleTimeString('pt-BR', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                        })}
                                                    </span>
                                                    &nbsp;às&nbsp;
                                                    <span className='underline'>
                                                        {selectedCloseDate.toLocaleTimeString('pt-BR', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                        })}
                                                    </span>
                                                    &nbsp;horas?
                                                </>
                                            ) : (
                                                <>
                                                    Tem certeza que deseja fechar a barbearia&nbsp;
                                                    <span className='underline'>
                                                        {selectedOpenDate?.toLocaleDateString('pt-BR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            weekday: 'long',
                                                        })}
                                                    </span>?
                                                </>
                                            )}
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