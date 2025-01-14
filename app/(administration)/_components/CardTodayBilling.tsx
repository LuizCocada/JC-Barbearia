'use client';

import { getBillingOfDay } from "@/actions/get/getBillingOfDay";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface CardTodayBillingProps {
    reload: () => void;
}


const CardTodayBilling = ({ reload }: CardTodayBillingProps) => {
    const [todayBilling, setTodayBilling] = useState<number>(0);

    useEffect(() => {
        const fetchBooKingofDay = async () => {
            const response = await getBillingOfDay();
            setTodayBilling(response);
        }
        fetchBooKingofDay();
    }, [reload]);


    return (
        <Card className="border-none pt-6 max-h-36">
            <CardContent>
                <div className="space-y-3">
                    <div className="flex gap-1 items-center">
                        <h3 className="font-bold md:text-xl md:font-semibold">Faturamento do dia</h3>
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
                        <div className="flex items-center gap-2 px-5 py-4 text-muted-foreground">
                            <p>Não há faturamentos para hoje.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}


export default CardTodayBilling;