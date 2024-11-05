'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { quickSearchOptions } from "@/constants/search";
import DialogContentLogin from "./LoginDialog";
import { signOut, useSession } from "next-auth/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


const MenuSheetContent = () => {

    const { data } = useSession()

    const handleLogOut = () => signOut()


    return (
        <SheetContent side={"right"} className="bg-background rounded-l-3xl overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 border-b py-5">
                {/* se existir usuario logado rederiza o componente de cima, senao o componente d`baixo */}
                {data?.user ? (
                    <div className="flex items-center gap-2 px-3">
                        <div>
                            <h2 className="font-bold">{data.user.name}</h2>
                            <p>Telefone: {data.user.telephone}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold text-lg">Faça seu login para agendar conosco!</h2>

                        <DialogContentLogin />
                    </>
                )}
            </div>


            <div className="p-5 flex flex-col gap-5 border-b-[0.1px]">
                {/* asChild é usado para nao dar error de 'hidratation' com o Link ou tag 'a'*/}
                <SheetClose asChild>
                    <Button className="rounded-xl justify-start gap-2 p-5" asChild>
                        <Link href={"/"} className="font-semibold">
                            <HomeIcon style={{ width: '18px', height: '18px' }} />
                            Ínicio
                        </Link>
                    </Button>
                </SheetClose>
                <SheetClose asChild>
                    <Button className="rounded-xl justify-start gap-2" variant="secondary" asChild>
                        <Link href={"/bookings"} className="font-semibold">
                            <CalendarIcon style={{ width: '18px', height: '18px' }} />
                            Meus Agendamentos
                        </Link>
                    </Button>
                </SheetClose>
            </div>

            <div className="p-5 flex flex-col gap-5 border-b-[0.1px]">
                {quickSearchOptions.map((option) => (
                    <SheetClose key={option.title} asChild>
                        <Button className="rounded-xl justify-start border-none gap-2 shadow-none text-foreground" variant="secondary" asChild>
                            <Link href={``}>
                                <Image src={option.imageUrl} alt={option.title} width={18} height={18} />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {data?.user && (
                <div className="pt-7 px-5">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="rounded-xl flex gap-2 border-none shadow-none" variant="outline">
                                <LogOutIcon />
                                Sair da conta
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%]">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sair da Plataforma</AlertDialogTitle>
                                <AlertDialogDescription>Deseja mesmo sair da plataforma?</AlertDialogDescription>
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
                </div>
            )}
        </SheetContent>
    );
}

export default MenuSheetContent;