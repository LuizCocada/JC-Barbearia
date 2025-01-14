'use client';

import { useState } from 'react';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarImageHeader, SidebarHeaderTitle, SidebarMain, SidebarNav, SidebarNavMain, SidebarNavLink, SidebarNavLinkBorder, SidebarNavHeader, SidebarNavHeaderTitle } from "../Sidebar";
import { BookmarkCheck, Clock, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { PersonIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export function MainSidebar() {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => setOpen(!open);

    const pasthname = usePathname();


    const isActive = (path: string) => {
        return pasthname === path;
    }

    const handleLogOut = () => signOut()

    return (
        <>
            {/* Botão de abrir a sidebar (visível em mobile) */}
            <button
                className="lg:hidden p-3 fixed top-0 left-0 z-50"
                onClick={toggleSidebar}
            >
                {open ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>





            <Sidebar
                className={`fixed lg:relative top-0 left-0 w-64 h-full z-40 bg-white transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
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
                            <SidebarNavLink className="flex items-center gap-2" href="/admin/clients" active={isActive('/admin/clients')}>
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
                            <SidebarNavLink className="flex items-center gap-2 mt-2 font-medium underline" href="/admin" active={isActive('/admin')}>
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





            {/* Fundo opaco para fechamento em mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
}
