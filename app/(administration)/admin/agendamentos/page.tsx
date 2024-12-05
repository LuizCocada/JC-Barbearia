'use client'

import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, CircleDollarSign, CircleOff, Mail } from "lucide-react";
import { GetCurrentBookings } from "@/actions/get/getCurrentBookings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Booking, Service, User } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../components/(Dashboard)/DashboardPage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getBillingOfDay } from "@/actions/get/getBillingOfDay";
import { Decimal } from "@prisma/client/runtime/library";
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
            const todayBilling = await getBillingOfDay();
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
                <DashboardPageMain>
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
                                                    {ConfirmedTodayBookings.map((booking, index) => (
                                                        <tr //abrir shit de cancelamento
                                                            key={booking.id}
                                                            className={
                                                                index === 0
                                                                    ? 'bg-primary border-t-[0.1px] border-gray-300'
                                                                    : 'bg-gray-200 border-t-[0.1px] border-gray-300'
                                                            }
                                                        >
                                                            <td className="p-4 border-r-[0.1px] border-gray-300 font-medium">{booking.user.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-300 font-medium">{booking.user.telephone}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-300 font-medium">{booking.service.name}</td>
                                                            <td className="p-4 border-r-[0.1px] border-gray-300 font-medium">
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
                            <Card className="border-none pt-6 ">
                                <CardContent>
                                    <div className="flex gap-2 items-center">
                                        <h3 className="font-semibold text-xl">Agendamentos totais</h3>
                                        <Mail className="w-[25px] h-[25px] text-background" fill="green" />
                                    </div>

                                    <div className="pt-3">
                                        <Button asChild>
                                            <Link href={"/admin/agendamentos/totais"} className="text-sm font-medium">
                                                Clique aqui
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-none pt-6 max-h-36">
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
                                            <div className="flex items-center gap-2 py-8 px-5 text-muted-foreground">
                                                <CircleOff />
                                                <p>Nenhum faturamento para hoje.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
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