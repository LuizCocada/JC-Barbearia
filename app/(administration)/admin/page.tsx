"use server"

import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, CircleDollarSign, CircleOff } from "lucide-react";
import { getTodayBookings } from "@/actions/getTodayBookings";
import BookingItem from "@/components/BookingItem";
import { getAllTodayBookings } from "@/actions/getAllTodayBookings";
import { Booking, Prisma } from "@prisma/client";
import { getConcludedBookings } from "@/data/GetConcludedBookings";



const AdminPage = async () => {

    const ConfirmedTodayBookings = await getTodayBookings() //retorna apenas os de hoje e maiores que hora atual.
    //const todayBilling = await getAllTodayBookings() //retorna faturamento do dia atual.

    return (
        <div>
            <div className="p-10">
                <Card className="border-none pt-6 grid grid-cols-2">
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex gap-1 items-center">
                                <h3 className="font-semibold text-xl">Agendamentos do dia</h3>
                                <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
                            </div>

                            {ConfirmedTodayBookings.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {ConfirmedTodayBookings.map((booking) => (
                                        <BookingItem key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                    <CircleOff />
                                    <p>Nenhum agendamento para hoje.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* <Card className="border-none pt-6 max-h-36">
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex gap-1 items-center">
                                <h3 className="font-semibold text-xl">Faturamento do dia</h3>
                                <CircleDollarSign className="w-[25px] h-[25px] text-background" fill="green" />
                            </div>

                            {todayBilling > 0 ? (
                                <div className="p-2 flex gap-1 text-lg font-bold">
                                    <p className="">Total: </p>
                                    <p className=" underline">
                                        {Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(Number(todayBilling))}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                    <CircleOff />
                                    <p>Nenhum faturamento para hoje.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
};

export default AdminPage;
