const FaturamentoPage = () => {
    return (
        <div>
            <h1>Faturamento</h1>


            {/* //const todayBilling = await getAllTodayBookings() //retorna faturamento do dia atual. */}


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
    );
}

export default FaturamentoPage;