'use client'

import { getTimes } from '@/actions/get/getTimes';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Times } from '@prisma/client';
import { set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarX2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const HourCard = () => {
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
    }

    const closeBarbershopOnDay = () => {
        setOpenOnDayBarberShop(false);
    }

    //time and day
    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }
    const handleSelectTime = (time: Times) => {
        setSelectedTime(time)
    }

    console.log(openOnDayBarberShop)

    // console.log(selectedDay)
    // console.log(selectedTime)

    return (
        <div className="items-center flex flex-col">
            <Card className="min-w-[70%] max-w-[70%] rounded-xl bg-card border-none p-2">
                <CardContent className="p-0 px-1 pt-1">
                    <div className="flex flex-col items-center text-center">
                        <CalendarX2 size={150} className="text-gray-300" />
                        <p className="font-medium underline">Selecione o dia deseja fechar à barbearia.</p>
                    </div>
                    <div className="w-full pt-3">
                        <Button
                            className="w-full py-5"
                            onClick={HandleSheetOpen}
                        >
                            Selecionar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Sheet open={sheetOpen} onOpenChange={HandleSheetOnOpenChange}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="border-b border-gray-300">
                            Gerenciar Horários
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
                                    Selecione horário de funcionamento
                                </Button>
                        <div className='border-b border-gray-300 py-2 mx-14'></div>
                        {!openOnDayBarberShop && (
                            <Button className='w-full mt-3 rounded-xl' variant={"destructive"} onClick={closeBarbershopOnDay}>
                                Fechar no dia selecionado
                            </Button>
                        )}
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
            </SheetContent>
        </Sheet>
        </div >
    );
};

export default HourCard;