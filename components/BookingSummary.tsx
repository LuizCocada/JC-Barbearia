import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Service, User } from "@prisma/client";

interface BookingSummaryProps {
    service: Pick<Service, "name" | "price">
    selectedDate: Date
    user?: User
}

const BookingSummary = ({ service, selectedDate, user }: BookingSummaryProps) => {
    return (
        <Card className="rounded-xl bg-primary border-none">
            <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-bold">{user?.name}</p>
                    <p className="font-bold text-sm underline">{user?.telephone}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm">{service.name}</p>
                    <p className="text-sm">
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(Number(service.price))}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm">Data</p>
                    {/* usando date-fns */}
                    <p className="text-sm">
                        {format(selectedDate, "d 'de' MMMM", {
                            locale: ptBR,
                        })}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm">Horário</p>
                    <p className="text-sm ">
                        {format(selectedDate, 'HH:mm')}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingSummary;


