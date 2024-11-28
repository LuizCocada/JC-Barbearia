'use client'

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Booking, Service, Times } from "@prisma/client";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import { getTimes } from "@/actions/(get)/getTimes";
import { useSession } from "next-auth/react";
import { Dialog } from "./ui/dialog";
import { format, set } from "date-fns";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/(create)/createBooking";
import BookingSummary from "./BookingSummary";
import { bookingAlreadyMade } from "@/actions/(get)/bookingAlreadyMade";
import TesteOnlyContentLogin from "./testeOnlyContentLogin";


interface ServiceItemProps {
    service: Service
}

const ServiceItem = ({ service }: ServiceItemProps) => {

    const { data } = useSession()
    const router = useRouter()

    const [signInDialogItsOpen, setSignInDialogItsOpen] = useState(false)
    const [bookingSheetItsOpen, setBookingSheetItsOpen] = useState(false)

    //verifica se o usuário está logado
    const handleVeridyUserLoggedIn = () => {
        if (data?.user) {
            return setBookingSheetItsOpen(true)
        }
        return setSignInDialogItsOpen(true)
    }

    //fechar dialog login apos login
    useEffect(() => {
        if (data?.user) {
            setSignInDialogItsOpen(false)
        }
    }, [data]);

    //reseta ao fechar a sheet
    const HandleBookingSheetOpenChange = () => {
        setBookingSheetItsOpen(false)
        setTimeList([])
        setSelectedDay(undefined)
        setSelectedTime(undefined)
    }

    //busca no db a lista de horários
    const [timeList, setTimeList] = useState<Times[]>([])
    useEffect(() => {
        const fetch = async () => {
            const times = await getTimes()
            setTimeList(times)
        }
        fetch()
    }, [bookingSheetItsOpen])



    //armazena o dia selecionado no calendário
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const handleSelectDay = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    //armazena o horário selecionado
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
    }

    //insere horas escolhidas no dia selecionado.
    const selectedDate = useMemo(() => {
        if (!selectedDay || !selectedTime) return
        return set(selectedDay, {
            hours: Number(selectedTime.split(":")[0]),
            minutes: Number(selectedTime.split(":")[1]),
        })
    }, [selectedDay, selectedTime])

    const [bookingsAlreadyMade, setbookingsAlreadyMade] = useState<Booking[]>([])
    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return
            const bookings = await bookingAlreadyMade({ date: selectedDay }) //pegando o id do agendamento e o dia e fazendo a busca no banco.
            setbookingsAlreadyMade(bookings)
        }
        fetch()
    }, [selectedDay, service.id])

    const dateBookings = bookingsAlreadyMade.map(booking => booking.date) //aqui filtra os horarios já agendados para o dia selecionado.
    const horaDiaAgendamento = dateBookings.map((booking) => {
        const parsedDate = new Date(booking)
        return format(parsedDate, 'H:mm') //retorna a string da hora e minuto do agendamento.
    })

    const timeListTimeString = timeList.map((time => time.time)) //transformando os times do banco em um array de strings.
    const filterTimeListValidhour = timeListTimeString.map((time) => {

        //##########################BUSCAR NO BANCO OS DIAS E HORARIOS QUE ESTARAO INDISPONIVEIS E FILTRAR AQUI.########################################################################################################
        if (!selectedDay || selectedDay.getDay() === 0) return null; //se o dia selecionado for domingo, não retorna horários.
        if (selectedDay.getDay() === 6 && time > "12:00") return null; //se o dia selecionado for sábado só retorna horários até 12:00. (de acordo com a barbearia.)

        const dateTimeString = `${selectedDay?.toISOString().split('T')[0]}T${time}:00`;
        return new Date(dateTimeString);//passando dateTimeString para um objeto Date (para ser usado no filtro abaixo.)  
        //###############################################################################################################################################################################################################

    })
        .filter((date) => date !== null && date.getTime() > new Date().getTime()) //filtrando apenas as datas que forem maior que a data, hora e minuto atual
        .map((date) => {
            if (date) {
                const hours = date.getHours();//pegando horas 
                const minutes = date.getMinutes().toString().padStart(2, '0'); //pegando minutos e adicionando zero à esquerda se preciso.
                return `${hours}:${minutes}`;// tempo disponivel para reserva à partir da hora e minuto do dia atual.
            }
            return null;
        }
        );



    const handleCreateBooking = async () => {
        try {
            if (!selectedDate || !data?.user) return

            // selectedDate //retorna o dia selecionado e seta o horario escolhido.

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
            <Card className="rounded-xl bg-popover">
                <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
                        <Image alt={"alt"} src={"/bannerYellow.png"} fill className="object-cover rounded-lg" />
                    </div>

                    <div className="space-y-2 flex-1">
                        <div>
                            <h3 className="font-semibold text-sm text-background">{service.name}</h3>
                            <p className="text-sm text-gray-300">{service.description}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-primary">
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
                                            fromDate={new Date()}//nao permite agendar no dia anterior à o presente. 
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
                                        //STYLES NESTE CASO APENAS PARA TELAS PEQUENAS, ONDE OCUPA 100% DO ESPAÇO, EM TELAS GRANDES ELE QUEBRA, `POSTERIORMENTE FAZER PARA TELAS GRANDES.`
                                        />
                                    </div>

                                    {selectedDay && (
                                        <div className="flex flex-wrap gap-1.5 border-b border-solid py-3">
                                            {filterTimeListValidhour.length > 0 ? (
                                                filterTimeListValidhour.map((time) => //listTimeString filtrando do array timeList apenas as datas que estao no futuro.
                                                    <Button key={time} className="rounded-full"
                                                        size={"sm"}
                                                        variant={selectedTime == time ? "default" : "outline"}
                                                        onClick={() => time && handleSelectTime(time)}
                                                        disabled={time ? horaDiaAgendamento.includes(time) : false}//se haver agendamento no banco deixa a hora indisponivel
                                                    >
                                                        {time}
                                                    </Button>
                                                )

                                            ) : <p className="text-sm font-semibold text-destructive">{selectedDay.getDay() === 0 ? "Não funcionamos aos Domingos" : "Não há mais horários disponiveis para hoje"}</p>
                                            }
                                        </div>
                                    )}

                                    {/* <div className="flex gap-1.5 py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                                        {timeList.map((time) => (
                                            <Button key={time.id} className="rounded-xl" onClick={() => handleSelectTime(time)}>
                                                {time.time}
                                            </Button>
                                        ))}
                                    </div> */}
                                    {selectedDate && (
                                        <div className="py-5 space-y-10">
                                            {/* RESUMO */}
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
                onOpenChange={(open) => setSignInDialogItsOpen(open)} //atualiza o estado de 'signInDialogItsOpen'
            >
                <TesteOnlyContentLogin />
            </Dialog>
        </>
    );
}

export default ServiceItem;