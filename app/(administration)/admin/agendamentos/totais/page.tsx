'use client'

import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, CircleOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Booking, Service, User } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../../components/(Dashboard)/DashboardPage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetBookingOfDay } from "@/actions/get/getBookingOfDay";
import { GetAllBookings } from "@/actions/get/getAllBookings";
const AgendamentosTotaisPage = () => {

    type BookingWithRelations = Booking & {
        user: User;
        service: Service;
    };

    
    //agendamentos do dia
    const [loadingTodayBookings, setLoadingTodayBookings] = useState(true);
    const [ConfirmedTodayBookings, setConfirmedTodayBookings] = useState<BookingWithRelations[]>([]);
    const [reloadTodayBookings, setReloadTodayBookings] = useState(0);
    useEffect(() => {
        const fetchBookingsOfDay = async () => {
            const bookingsOfDay = await GetBookingOfDay();
            setConfirmedTodayBookings(bookingsOfDay);
            setLoadingTodayBookings(false);
        };

        fetchBookingsOfDay();
    }, [reloadTodayBookings]);

    const reloadBookingsOfDay = () => {
        setLoadingTodayBookings(true);
        setReloadTodayBookings(reloadTodayBookings + 1);
    };


    //agendamentos totais
    const [loadingAllBookings, setLoadingAllBookings] = useState(true);
    const [allBookings, setAllBookings] = useState<BookingWithRelations[]>([]);
    const [reloadAllBookings, setReloadAllBookings] = useState(0);

    useEffect(() => {
        const fetchAllBookings = async () => {
            const allBookings = await GetAllBookings();
            setAllBookings(allBookings);
            setLoadingAllBookings(false);
        };

        fetchAllBookings();
    }, [reloadAllBookings]);

    const reloadAllBooking = () => {
        setLoadingAllBookings(true);
        setReloadAllBookings(reloadAllBookings + 1);
    }

 

    return (
        <div>
            <DashboardPage>
                <DashboardPageHeader>
                    <DashboardPageHeaderTitle>
                        Agendamentos Totais
                    </DashboardPageHeaderTitle>
                </DashboardPageHeader>
                <DashboardPageMain>
                    <div className="p-10 px-20">
                        <Card className="border-none pt-6">
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex gap-1 items-center border-b-[0.1px] border-gray-300">
                                        <h3 className="font-semibold text-xl">Agendamentos totais de hoje</h3>
                                        <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    {loadingTodayBookings ? (
                                        <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                            <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
                                            <p>Carregando...</p>
                                        </div>
                                    ) : (
                                        ConfirmedTodayBookings.length > 0 ? (
                                            <table className="w-full text-left rounded-xl overflow-hidden">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Nome</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Telefone</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Serviço</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Valor</th>
                                                        <th className="p-4">Hora</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ConfirmedTodayBookings.map((booking) => (
                                                        <tr //abrir shit de cancelamento
                                                            key={booking.id}
                                                            className={'bg-gray-300 border-t-[0.1px] border-gray-600'}
                                                        >
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.user.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.user.telephone}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.service.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">
                                                                {Intl.NumberFormat("pt-BR", {
                                                                    style: "currency",
                                                                    currency: "BRL",
                                                                }).format(Number(booking.service.price))}
                                                            </td>
                                                            <td className="p-4 font-medium">
                                                                {format(new Date(booking.date), 'HH:mm', { locale: ptBR })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <CircleOff />
                                                <p>Nenhum agendamento para hoje.</p>
                                            </div>
                                        )
                                    )}

                                    <div className="flex justify-end">
                                        <Button className="rounded-xl" size={"sm"} onClick={reloadBookingsOfDay}>
                                            Recarregar
                                            <ReloadIcon />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="border-b border-gray-300 my-10"></div>

                        <Card className="border-none pt-6">
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex gap-1 items-center border-b-[0.1px] border-gray-300">
                                        <h3 className="font-semibold text-xl">Agendamentos totais</h3>
                                        <Mail className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    {loadingAllBookings ? (
                                        <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                            <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
                                            <p>Carregando...</p>
                                        </div>
                                    ) : (
                                        allBookings.length > 0 ? (
                                            <table className="w-full text-left rounded-xl overflow-hidden">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Nome</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Telefone</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Serviço</th>
                                                        <th className="p-4 border-r-[0.1px] border-gray-200">Valor</th>
                                                        <th className="p-4">Hora</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allBookings.map((booking) => (
                                                        <tr //abrir shit de cancelamento
                                                            key={booking.id}
                                                            className={'bg-gray-300 border-t-[0.1px] border-gray-600'}
                                                        >
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.user.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.user.telephone}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">{booking.service.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-600 font-medium">
                                                                {Intl.NumberFormat("pt-BR", {
                                                                    style: "currency",
                                                                    currency: "BRL",
                                                                }).format(Number(booking.service.price))}
                                                            </td>
                                                            <td className="p-4 font-medium">
                                                                {format(new Date(booking.date), 'HH:mm', { locale: ptBR })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <CircleOff />
                                                <p>Nenhum há agendamentos</p>
                                            </div>
                                        )
                                    )}

                                    <div className="flex justify-end">
                                        <Button className="rounded-xl" size={"sm"} onClick={reloadAllBooking}>
                                            Recarregar
                                            <ReloadIcon />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </DashboardPageMain>
            </DashboardPage>
        </div>
    )
}

export default AgendamentosTotaisPage;
