'use client'

import { Sidebar, SidebarFooter, SidebarHeader, SidebarHeaderTitle, SidebarImageHeader, SidebarMain, SidebarNav, SidebarNavHeader, SidebarNavHeaderTitle, SidebarNavLink, SidebarNavLinkBorder, SidebarNavMain } from "../../components/Sidebar";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BookmarkCheck, Clock, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";


export function MainSidebar() {

    const pasthname = usePathname();


    const isActive = (path: string) => {
        return pasthname === path;
    }

    const handleLogOut = () => signOut()


    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarImageHeader>
                    <Image width={40} height={40} className="rounded" src={"/logoBarber.png"} alt={'logo'} />
                </SidebarImageHeader>
                <SidebarHeaderTitle>JC Barbearia</SidebarHeaderTitle>
            </SidebarHeader>
            <SidebarMain className="flex flex-col flex-grow">

                <SidebarNav>
                    <SidebarNavMain>
                        <SidebarNavLink className="flex items-center gap-2" href="/admin/agendamentos" active={isActive('/admin/agendamentos') || isActive('/admin/agendamentos/totais')}>
                            <BookmarkCheck className="w-[18px] h-[18px]" />
                            Agendamentos
                        </SidebarNavLink>
                        <SidebarNavLinkBorder />
                        {/* <SidebarNavLink className="flex items-center gap-2" href="/admin/faturamento" active={isActive('/admin/faturamento')}>
                            <CircleDollarSign className="w-[18px] h-[18px]" />
                            Faturamento
                        </SidebarNavLink> */}
                        {/* <SidebarNavLinkBorder /> */}
                        <SidebarNavLink className="flex items-center gap-2" href="/admin/clientes" active={isActive('/admin/')}>
                            <PersonIcon className="w-[18px] h-[18px]" />
                            Clientes
                        </SidebarNavLink>
                        <SidebarNavLinkBorder />
                    </SidebarNavMain>
                </SidebarNav>

                <SidebarNav className="mt-10">
                    <SidebarNavHeader>
                        <SidebarNavHeaderTitle>Gerenciar</SidebarNavHeaderTitle>
                    </SidebarNavHeader>
                    <SidebarNavMain>
                        <SidebarNavLink className="flex items-center gap-2 font-medium underline" href="/admin" active={isActive('/admin')}>
                            <Clock className="w-[18px] h-[18px]" />
                            Horários
                        </SidebarNavLink>
                        <SidebarNavLinkBorder />
                    </SidebarNavMain>
                </SidebarNav>



                <SidebarNav className="mt-auto">
                    <SidebarNavHeader>
                        <SidebarNavHeaderTitle>Site</SidebarNavHeaderTitle>
                    </SidebarNavHeader>
                    <SidebarNavMain className="underline text-sm mb-3">
                        <SidebarNavLink href="/">Barbearia</SidebarNavLink>
                    </SidebarNavMain>

                    <SidebarNavHeader>
                        <SidebarNavHeaderTitle>Suporte</SidebarNavHeaderTitle>
                    </SidebarNavHeader>
                    <SidebarNavMain className="underline text-sm">
                        <SidebarNavLink href="/admin">Precisa de ajuda?</SidebarNavLink> {/* //link para página de suporte */}
                    </SidebarNavMain>
                </SidebarNav>

            </SidebarMain>


            <SidebarFooter>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="rounded-xl flex gap-2 border-none shadow-none bg-muted" variant="outline">
                            <LogOutIcon />
                            Sair da conta
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90%]">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sair do Painel Administrador</AlertDialogTitle>
                            <AlertDialogDescription>Ao sair, será necessário logar como administrador novamente.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                className="rounded-xl bg-destructive text-background" onClick={handleLogOut}>
                                Sair
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarFooter>
        </Sidebar>
    )
}