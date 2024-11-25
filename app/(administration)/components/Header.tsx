

import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const Header = () => {
    return (
        <div>
            <Card className="rounded-none border-none">
                <CardContent className="flex justify-between bg-primary items-center p-2 px-20">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">Painel de Administrador</h1>
                        <p className="font-medium">Administrador: Jony</p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Bell />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mx-5 bg-muted">
                            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>map de Notificações de novo agendamento</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>
        </div>
    );
}

export default Header;