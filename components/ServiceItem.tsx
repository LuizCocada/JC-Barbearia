'use client'

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Booking, Service, Times } from "@prisma/client";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import { getTimes } from "../actions/get/getTimes";
import { useSession } from "next-auth/react";
import { Dialog } from "./ui/dialog";
import { daysInWeek, format, set } from "date-fns";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/create/createBooking";
import BookingSummary from "./BookingSummary";
import { bookingAlreadyMade } from "../actions/get/bookingAlreadyMade";
import TesteOnlyContentLogin from "./testeOnlyContentLogin";

interface ServiceItemProps {
    service: Service
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    const { data } = useSession()
    const router = useRouter()

    const [signInDialogItsOpen, setSignInDialogItsOpen] = useState(false)
    const [bookingSheetItsOpen, setBookingSheetItsOpen] = useState(false)
    const [timeList, setTimeList] = useState<Times[]>([])
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [bookingsAlreadyMade, setbookingsAlreadyMade] = useState<Booking[]>([])


    // Verifica se o usuário está logado
    const handleVeridyUserLoggedIn = () => {
        if (data?.user) {
            return setBookingSheetItsOpen(true)
        }
        return setSignInDialogItsOpen(true)
    }

    // Fechar dialog login após login
    useEffect(() => {
        if (data?.user) {
            setSignInDialogItsOpen(false)
        }
    }, [data]);

    // Reseta ao fechar a sheet
    const HandleBookingSheetOpenChange = () => {
        setBookingSheetItsOpen(false)
        setTimeList([])
        setSelectedDay(undefined)
        setSelectedTime(undefined)
    }

    // Busca no db a lista de horários fixos
    useEffect(() => {
        const fetch = async () => {
            const times = await getTimes()
            setTimeList(times)
        }
        fetch()
    }, [bookingSheetItsOpen])

    // Armazena o dia selecionado no calendário
    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    // Armazena o horário selecionado
    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
    }

    // Insere horas escolhidas no dia selecionado
    const selectedDate = useMemo(() => {
        if (!selectedDay || !selectedTime) return
        return set(selectedDay, {
            hours: Number(selectedTime.split(":")[0]),
            minutes: Number(selectedTime.split(":")[1]),
        })
    }, [selectedDay, selectedTime])

    // Busca agendamentos já feitos
    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return
            const bookings = await bookingAlreadyMade({ date: selectedDay })
            setbookingsAlreadyMade(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    // Filtra horários já agendados para o dia selecionado
    const dateBookings = bookingsAlreadyMade.map(booking => booking.date)
    const horaDiaAgendamento = dateBookings.map((booking) => {
        const parsedDate = new Date(booking)
        return format(parsedDate, 'H:mm')
    })


    // Filtra horários disponíveis
    const timeListTimeString = timeList.map((time => time.time))
    const filterTimeListValidhour = timeListTimeString.map((time) => {

        if (!selectedDay) return null
        if (selectedDay.getDay() === 6 && time > "12:00") return null //pensar






        const dateTimeString = `${selectedDay?.toISOString().split('T')[0]}T${time}:00`
        return new Date(dateTimeString)
    })
        .filter((date) => date !== null && date.getTime() > new Date().getTime())
        .map((date) => {
            if (date) {
                const hours = date.getHours()
                const minutes = date.getMinutes().toString().padStart(2, '0')
                return `${hours}:${minutes}`
            }
            return null
        })

    // Cria uma nova reserva
    const handleCreateBooking = async () => {
        try {
            if (!selectedDate || !data?.user) return

            await createBooking({
                userId: data?.user.id,
                serviceId: service.id,
                date: selectedDate,
            })

            toast.success("Reserva criada com sucesso!", {
                action: {
                    label: "Ver agendamentos",
                    onClick: () => router.push("/bookings")
                }
            })

        } catch (error) {
            console.log(error)
            toast.error("Error ao criar reserva")
        }
    }

    return (
        <>
            <Card className="rounded-xl bg-card border-none">
                <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
                        <Image alt={"alt"} src={"/corteExemplo.png"} fill className="object-cover rounded-lg" />
                    </div>

                    <div className="space-y-2 flex-1">
                        <div>
                            <h3 className="font-semibold text-sm">{service.name}</h3>
                            <p className="text-sm text-gray-400">{service.description}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm">
                                {Intl.NumberFormat("pt-BR", {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(Number(service.price))}
                            </p>
                            <Sheet open={bookingSheetItsOpen} onOpenChange={HandleBookingSheetOpenChange}>
                                <Button className="rounded-xl font-semibold w-full" size="sm" onClick={handleVeridyUserLoggedIn}>
                                    Reservar
                                </Button>
                                <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden bg-background">
                                    <SheetHeader>
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="border-b border-solid py-5">
                                        <Calendar
                                            mode={"single"}
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleSelectDay}
                                            fromDate={new Date()}
                                            disabled={{ dayOfWeek: [0] }}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>

                                    {selectedDay && (
                                        <div className="flex flex-wrap gap-1.5 border-b border-solid py-3">
                                            {filterTimeListValidhour.length > 0 ? (
                                                filterTimeListValidhour.map((time) =>
                                                    <Button key={time} className="rounded-full"
                                                        size={"sm"}
                                                        variant={selectedTime == time ? "default" : "outline"}
                                                        onClick={() => time && handleSelectTime(time)}
                                                        disabled={time ? horaDiaAgendamento.includes(time) : false}
                                                    >
                                                        {time}
                                                    </Button>
                                                )
                                            ) : <p className="text-sm font-semibold text-destructive">{selectedDay.getDay() === 0 ? "Não funcionamos aos Domingos" : "Não há mais horários disponiveis"}</p>
                                            }
                                        </div>
                                    )}

                                    {selectedDate && (
                                        <div className="py-5 space-y-10">
                                            <BookingSummary
                                                service={service}
                                                selectedDate={selectedDate}
                                            />
                                        </div>
                                    )}
                                    <SheetFooter className="pt-5">
                                        <SheetClose asChild>
                                            <Button
                                                className="w-full rounded-xl"
                                                onClick={(handleCreateBooking)}
                                                disabled={!selectedTime || !selectedDay}
                                            >
                                                Confirmar
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={signInDialogItsOpen}
                onOpenChange={(open) => setSignInDialogItsOpen(open)}
            >
                <TesteOnlyContentLogin />
            </Dialog>
        </>
    );
}

export default ServiceItem;