'use client'

import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, CircleOff } from "lucide-react";
import { GetCurrentBookings } from "@/actions/get/getCurrentBookings";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Booking, Service, User } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../_components/(Dashboard)/DashboardPage";
import BookingCurrentTable from "../../_components/BookingCurrentTable";
import CardTodayBilling from "../../_components/CardTodayBilling";
import CardTotallyBookings from "../../_components/CardTotallyBookings";
const AgendamentosPage = () => {

    type BookingWithRelations = Booking & {
        user: User;
        service: Service;
    };

    const [ConfirmedTodayBookings, setConfirmedTodayBookings] = useState<BookingWithRelations[]>([]);
    const [todayBilling, setTodayBilling] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const fetchBookingsAndInvoicing = async () => {
            const bookings = await GetCurrentBookings();
            setConfirmedTodayBookings(bookings);
            setTodayBilling(todayBilling);
            setLoading(false);
        };

        fetchBookingsAndInvoicing();
    }, [reloadCount]);

    const reload = () => {
        setLoading(true);
        setReloadCount(reloadCount + 1);
    }


    return (
        <div>
            <DashboardPage>
                <DashboardPageHeader>
                    <DashboardPageHeaderTitle>
                        Agendamentos
                    </DashboardPageHeaderTitle>
                </DashboardPageHeader>
                <DashboardPageMain className="pb-20">
                    <div className="pt-10 px-20">
                        <Card className="border-none pt-6">
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex gap-1 items-center border-b-[0.1px] border-gray-300">
                                        <h3 className="font-semibold text-xl">Agendamentos confirmados</h3>
                                        <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    {loading ? (
                                        <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                            <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
                                            <p>Carregando...</p>
                                        </div>
                                    ) : (
                                        ConfirmedTodayBookings.length > 0 ? (
                                            <BookingCurrentTable bookings={ConfirmedTodayBookings} onDelete={reload}/>
                                        ) : (
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <CircleOff />
                                                <p>Nenhum agendamento para hoje.</p>
                                            </div>
                                        )
                                    )}

                                    <div className="flex justify-end">
                                        <Button className="rounded-xl" size={"sm"} onClick={reload}>
                                            Recarregar
                                            <ReloadIcon />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="border-b-[0.1px] border-gray-300 pt-10"></div>

                        <div className="grid grid-cols-2 gap-10 mt-8">
                            <CardTotallyBookings />
                            <CardTodayBilling reload={reload}/>
                        </div>
                    </div>
                </DashboardPageMain>
            </DashboardPage>
        </div>
    )
}

export default AgendamentosPage;















































// 'use client'

// import { Card, CardContent } from "@/components/ui/card";
// import { BookmarkCheck, CircleOff, Mail } from "lucide-react";
// import { GetCurrentBookings } from "@/actions/(get)/getCurrentBookings";
// import BookingItemAdmin from "../../components/BookingItemAdmin";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Booking, Service, User } from "@prisma/client";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../components/(Dashboard)/DashboardPage";


// const AgendamentosPage = () => {

//     type BookingWithRelations = Booking & {
//         user: User;
//         service: Service;
//     };

//     const [ConfirmedTodayBookings, setConfirmedTodayBookings] = useState<BookingWithRelations[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [reloadCount, setReloadCount] = useState(0);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             const bookings = await GetCurrentBookings();
//             setConfirmedTodayBookings(bookings);
//             setLoading(false);
//         };

//         fetchBookings();
//     }, [reloadCount]);


//     const reload = () => {
//         setLoading(true);
//         setReloadCount(reloadCount + 1);
//     }

//     return (
//         <div>
//             <DashboardPage>
//                 <DashboardPageHeader>
//                     <DashboardPageHeaderTitle className="font-semibold text-xl">
//                         Agendamentos
//                     </DashboardPageHeaderTitle>
//                 </DashboardPageHeader>
//                 <DashboardPageMain>
//                     <div className="pt-10 px-20">
//                         <Card className="border-none pt-6">
//                             <CardContent>
//                                 <div className="space-y-6">
//                                     <div className="flex gap-1 items-center">
//                                         <h3 className="font-semibold text-xl">Agendamentos confirmados para hoje</h3>
//                                         <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
//                                     </div>

//                                     {loading ? (
//                                         <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
//                                             <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
//                                             <p>Carregando...</p>
//                                         </div>
//                                     ) : (
//                                         ConfirmedTodayBookings.length > 0 ? (
//                                             <div className="grid grid-cols-2 gap-5">
//                                                 {ConfirmedTodayBookings.map((booking) => (
//                                                     <BookingItemAdmin key={booking.id} booking={booking} />
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
//                                                 <CircleOff />
//                                                 <p>Nenhum agendamento para hoje.</p>

//                                                 <div>
//                                                     <Button className="rounded-xl" size={"sm"} onClick={reload}>
//                                                         Recarregar
//                                                         <ReloadIcon />
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         )
//                                     )}

//                                     <div className="flex justify-end">
//                                         <Button className="rounded-xl" size={"sm"} onClick={reload}>
//                                             Recarregar
//                                             <ReloadIcon />
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         <div className="border-b-[0.1px] border-muted-foreground pt-10"></div>

//                         <div className="grid grid-cols-2 mt-8">
//                             <Card className="border-none pt-6 ">
//                                 <CardContent>
//                                     <div className="flex gap-2 items-center">
//                                         <h3 className="font-semibold text-xl">Agendamentos totais</h3>
//                                         <Mail className="w-[25px] h-[25px] text-background" fill="green" />
//                                     </div>

//                                     <div className="pt-3">
//                                         <Button asChild>
//                                             <Link href={"/admin/agendamentos/totais"} className="text-sm font-medium">
//                                                 Clique aqui
//                                             </Link>
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </DashboardPageMain>
//             </DashboardPage>
//         </div >




//     )
// }

// export default AgendamentosPage;