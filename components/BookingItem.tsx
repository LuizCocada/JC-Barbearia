"use client" //tem Onclick()

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "./BookingSummary"
import { deleteBooking } from "@/actions/deleteBooking"


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
        },
    }>
}

const BookingItem = ({ booking }: BookingItemProps) => {


    const date = new Date(booking.date); //por algum motivo o date-fns nao aceita o booking.date diretamente

    const isConfirmed = isFuture(date)

    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleCancelBooking = async () => {
        try {
            await deleteBooking(booking.id)
            setIsSheetOpen(false)
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Error ao cancelar reserva.")
        }
    }

    return (
        <>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger className="cursor-pointer" asChild>
                    <div className="min-w-[80%]">
                        <Card className="rounded-3xl bg-primary border-none">
                            <CardContent className="flex justify-between p-0">
                                <div className="flex flex-col gap-2 py-5 pl-5">

                                    <Badge className={`w-fit rounded-xl ${isConfirmed ? "bg-green-600" : "bg-red-600"}`}>
                                        {isConfirmed ? 'Confirmado' : 'Finalizado'}
                                    </Badge>

                                    <div className="flex items-center gap-2 px-2">
                                        <h3 className="font-semibold">{booking.service.name}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center px-5 border-l">
                                    <p className="text-sm">{format(date, 'MMMM', { locale: ptBR })}</p>
                                    <p className="text-2xl">{format(date, 'dd', { locale: ptBR })}</p>
                                    <p className="text-sm">{format(date, 'HH:mm', { locale: ptBR })}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </SheetTrigger>
                <SheetContent className="min-w-[90%] bg-background p-0 rounded-t-3xl" side={"bottom"}>
                    <SheetHeader className="border-b">
                        <SheetTitle className="p-5 items-center">Informações da Reserva</SheetTitle>
                    </SheetHeader>


                    <div className="p-5 space-y-5">
                        <div className="border-b-[0.1px] border-muted-foreground pb-3">
                            <h3 className="text- font-semibold">Observações</h3>
                            <p className="text-sm text-justify">Trabalhamos com horários fixos, porém, dependendo do estilo de corte e/ou problemas externos, podem ocorrer variações de hórarios</p>
                        </div>

                        <Badge className="w-fit bg-green-500 hover:bg-green-500">
                            {isConfirmed ? 'Confirmado' : 'Finalizado'}
                        </Badge>

                        <BookingSummary service={booking.service} selectedDate={date} />

                        <SheetFooter>
                            <div className="flex items-center gap-3">
                                <SheetClose asChild>
                                    <Button className="w-full rounded-xl font-semibold" variant={"outline"}>
                                        Voltar
                                    </Button>
                                </SheetClose>


                                {isConfirmed
                                    ?
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="w-full rounded-xl font-semibold" variant={"destructive"}>
                                                Cancelar Reserva
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="w-[90%] flex flex-col rounded-xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tem certeza que deseja cancelar este agendamento?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <div className="flex items-center gap-3">
                                                    <AlertDialogCancel className="m-0 w-full rounded-xl">
                                                        Voltar
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="m-0 w-full rounded-xl bg-destructive text-background"
                                                        onClick={handleCancelBooking}
                                                    >
                                                        Confirmar
                                                    </AlertDialogAction>
                                                </div>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    :
                                    <Button className="w-full rounded-xl font-semibold">
                                        Avaliar
                                    </Button>
                                }

                            </div>
                        </SheetFooter>

                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default BookingItem



