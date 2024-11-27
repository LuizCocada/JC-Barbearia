
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, CircleDollarSign, CircleOff } from "lucide-react";
import { getTodayBookings } from "@/actions/(get)/getCurrentBookings";
import BookingItem from "@/components/BookingItem";
import { getAllTodayBookings } from "@/actions/(get)/getBillingOfDay";
import { Booking, Prisma } from "@prisma/client";
import { getConcludedBookings } from "@/data/GetConcludedBookings";



const AdminPage = () => {

    return (
        <div className="flex flex-col gap-5 justify-center items-center h-[70vh] text-muted-foreground font-bold uppercase">
            <h1>
                Painel Administrativo
            </h1>
            <h1>
                JC-Barbearia
            </h1>
        </div>
    )
};

export default AdminPage;
