import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";




const CardTotallyBookings = () => {
    return (
        <Card className="border-none pt-6 ">
            <CardContent>
                <div className="flex gap-2 items-center">
                    <h3 className="font-semibold text-xl">Agendamentos totais</h3>
                    <Mail className="w-[25px] h-[25px] text-background" fill="green" />
                </div>

                <div className="flex flex-col pt-6">
                    <Button asChild className="rounded-2-xl hover:scale-[1.02] transition-transform duration-300">
                        <Link href={"/admin/agendamentos/totais"} className="text-sm font-bold uppercase">
                            Ver todos os agendamentos
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};



export default CardTotallyBookings;