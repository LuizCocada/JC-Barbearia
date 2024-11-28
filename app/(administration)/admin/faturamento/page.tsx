import { Card, CardContent } from "@/components/ui/card";
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../../components/(Dashboard)/DashboardPage";
import { CircleDollarSign, CircleOff } from "lucide-react";
import { getBillingOfDay } from "@/actions/(get)/getBillingOfDay";



const FaturamentoPage = async () => {


    const todayBilling = await getBillingOfDay() //retorna faturamento do dia atual. */}

    return (
        <div>
            <DashboardPage>
                <DashboardPageHeader>
                    <DashboardPageHeaderTitle className="font-semibold text-xl">
                        Faturamento
                    </DashboardPageHeaderTitle>
                </DashboardPageHeader>
                <DashboardPageMain>
                    <div className="flex flex-col gap-5 justify-center items-center text-muted-foreground font-bold uppercase">



                    </div>
                </DashboardPageMain>
            </DashboardPage>



            <div className="pt-10 px-20">
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
                                <div className="flex items-center gap-2 pt-8 px-5 text-muted-foreground">
                                    <CircleOff />
                                    <p>Nenhum faturamento para hoje.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default FaturamentoPage;