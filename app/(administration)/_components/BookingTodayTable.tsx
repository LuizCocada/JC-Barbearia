import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Booking, Prisma, Service, User } from "@prisma/client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingSummary from "@/components/BookingSummary";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBooking } from "@/actions/delete/deleteBooking";
import { toast } from "sonner";

interface BookingTableProps {
    bookings: Prisma.BookingGetPayload<{
        include: {
            service: true,
            user: true,
        },
    }>[];
    onDelete: () => void;
}


const BookingTodayTable = ({ bookings, onDelete }: BookingTableProps) => {

    type BookingWithRelations = Booking & {
        user: User;
        service: Service;
    };



    const [selectedBooking, setSelectedBooking] = useState<BookingWithRelations | null>(null);

    const handleOpenSheet = (booking: BookingWithRelations) => {
        setSelectedBooking(booking);
    };

    const handleCloseSheet = () => {
        setSelectedBooking(null);
    };

    const handleCancelBooking = async () => {
        if (!selectedBooking) return

        try {
            await deleteBooking({
                data: {
                    bookingId: selectedBooking.id,
                    date: selectedBooking.date,
                    user: selectedBooking.user,
                },
            })
            setSelectedBooking(null)
            toast.success("Reserva cancelada com sucesso!")
            onDelete()//ao realizar o cancelamento, notificar o componente pai para atualizar a lista de agendamentos
        } catch (error) {
            console.log(error)
            toast.error("Error ao cancelar reserva.")
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left rounded-xl overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 md:p-4 md:px-10 border-r-[0.1px] border-gray-200">Nome</th>
                        <th className="p-2 text-center md:p-4 md:px-10 border-r-[0.1px] border-gray-200">Serviço</th>
                        {/* <th className="p-2 md:p-4 md:px-10 border-r-[0.1px] border-gray-200">Valor</th> */}
                        <th className="p-2 md:p-4 md:px-10">Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr
                            key={booking.id}
                            className={
                                index === 0
                                    ? 'bg-primary cursor-pointer hover:scale-105 transition-transform duration-300'
                                    : 'bg-gray-200 border-t-[0.1px] border-gray-300 cursor-pointer hover:bg-primary hover:scale-105 transition-transform duration-300'
                            }
                            onClick={() => handleOpenSheet(booking)}
                        >
                            <td className="p-4 md:px-10 font-medium">{booking.user.name}</td>
                            <td className="p-4 md:px-10 font-medium text-center">{booking.service.name}</td>
                            {/* <td className="p-2 md:p-4 md:px-10 font-medium">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(booking.service.price))}
                        </td> */}
                            <td className="p-4 md:px-10 font-medium">
                                {format(new Date(booking.date), 'HH:mm', { locale: ptBR })}
                            </td>
                        </tr>
                    ))}
                </tbody>
                {selectedBooking && (
                    <Sheet open={!!selectedBooking} onOpenChange={handleCloseSheet}>
                        <SheetContent side={"top"} className="flex justify-center">
                            <Card className="rounded-xl border-none shadow-none">
                                <CardContent className="flex justify-between p-0">
                                    <div className="p-5 space-y-5">
                                        <div className="border-b-[0.1px] border-muted-foreground pb-3">
                                            <h3 className="font-semibold">Atenção</h3>
                                            <p className="text-justify">
                                                Esta ação é irrevercível, tem certeza que deseja cancelar o agendamento de <span className="font-bold">{selectedBooking.user.name}</span>?
                                            </p>
                                        </div>

                                        <Badge className={`w-fit ${selectedBooking.date >= new Date() ? 'bg-green-500 hover:bg-green-500' : 'bg-red-500 hover:bg-red-500'}`}>
                                            {selectedBooking.date >= new Date() ? 'Confirmado' : 'Finalizado'}
                                        </Badge>

                                        <BookingSummary service={selectedBooking.service} selectedDate={selectedBooking.date} user={selectedBooking.user} />

                                        <div className="flex items-center gap-3">
                                            <SheetClose asChild>
                                                <Button className="w-full rounded-xl font-semibold" variant={"outline"}>
                                                    Voltar
                                                </Button>
                                            </SheetClose>

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
                                                            <AlertDialogCancel className="m-0 w-full rounded-xl" onClick={handleCloseSheet}>
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
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </SheetContent>
                    </Sheet>
                )}
            </table>
        </div>
    );
};

export default BookingTodayTable;