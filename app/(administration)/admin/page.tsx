import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "../components/(Dashboard)/DashboardPage";




const AdminPage = () => {

    return (
        <div>
            <DashboardPage>
                <DashboardPageHeader>
                    <DashboardPageHeaderTitle className="font-semibold text-xl">
                        Horários
                    </DashboardPageHeaderTitle>
                </DashboardPageHeader>
                <DashboardPageMain>
                    <div className="flex flex-col gap-5 justify-center items-center text-muted-foreground font-bold uppercase">
                        <h1>
                            Painel Administrativo
                        </h1>
                        <h1>
                            JC-Barbearia
                        </h1>
                    </div>
                </DashboardPageMain>
            </DashboardPage>




        </div>
    )
};

export default AdminPage;
