'use client'

import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Booking, Service, User } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../../_components/(Dashboard)/DashboardPage";
import { GetBookingOfDay } from "@/actions/get/getBookingOfDay";
import { GetAllBookings } from "@/actions/get/getAllBookings";
import Link from "next/link";
import BookingTodayTable from "@/app/(administration)/_components/BookingTodayTable";
import BookingsTotallyTable from "@/app/(administration)/_components/BookingsTotallyTable";
const AgendamentosTotaisPage = () => {

    type BookingWithRelations = Booking & {
        user: User;
        service: Service;
    };


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
                    <DashboardPageHeaderTitle className="flex gap-3">
                        <Link href="/admin/agendamentos">
                            <ChevronLeft />
                        </Link>
                        Agendamentos Totais
                    </DashboardPageHeaderTitle>
                </DashboardPageHeader>
                <DashboardPageMain>
                    <div className="p-10 px-5 lg:px-20">
                        <Card className="border-none pt-6">
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex gap-1 items-center border-b-[0.1px] border-gray-300">
                                        <h3 className="font-bold md:text-xl md:font-semibold">Agendamentos totais de hoje</h3>
                                        <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    {loadingTodayBookings ? (
                                        <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                            <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
                                            <p>Carregando...</p>
                                        </div>
                                    ) : (
                                        ConfirmedTodayBookings.length > 0 ? (
                                            <BookingTodayTable bookings={ConfirmedTodayBookings} onDelete={reloadBookingsOfDay}/>
                                        ) : (
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <p>Não há agendamento para hoje.</p>
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
                                        <h3 className="font-bold md:text-xl md:font-semibold">Agendamentos totais</h3>
                                        <Mail className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    {loadingAllBookings ? (
                                        <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                            <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
                                            <p>Carregando...</p>
                                        </div>
                                    ) : (
                                        allBookings.length > 0 ? (
                                            <BookingsTotallyTable bookings={allBookings} onDelete={reloadAllBooking}/>
                                        ) : (
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <p>Não há agendamentos</p>
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
