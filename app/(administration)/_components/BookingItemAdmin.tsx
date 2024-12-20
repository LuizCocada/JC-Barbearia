"use client"

import { Prisma } from "@prisma/client"
import { isFuture } from "date-fns"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "../../../components/BookingSummary"
import { deleteBooking } from "@/actions/delete/deleteBooking"
import { Sheet, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            user: true,
        },
    }>
}

const BookingItemAdmin = ({ booking }: BookingItemProps) => {

    const date = new Date(booking.date); //por algum motivo o date-fns nao aceita o booking.date diretamente

    const isConfirmed = isFuture(date)

    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleCancelBooking = async () => {
        try {
            await deleteBooking({
                data: {
                    bookingId: booking.id,
                    date: booking.date,
                    user: booking.user,
                },
            })
            setIsSheetOpen(false)
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Error ao cancelar reserva.")
        }
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="min-w-[50%]">
                <Card className="rounded-xl bg-primary border-none">
                    <CardContent className="flex justify-between p-0">
                        <div className="p-5 space-y-5">
                            <div className="border-b-[0.1px] border-muted-foreground pb-3">
                                <h3 className="text- font-semibold">Atenção</h3>
                                <p className="text-sm text-justify">Esta ação é irrevercível, tem certeza que deseja cancelar o agendamento de {booking.user.name}?</p>
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
                    </CardContent>
                </Card>
            </div>
        </Sheet>
    )
}

export default BookingItemAdmin



