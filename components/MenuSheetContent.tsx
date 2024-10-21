import { CalendarIcon, HomeIcon, LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { quickSearchOptions } from "@/constants/search";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import DialogContentLogin from "./DialogContentLogin";

const MenuSheetContent = () => {
    return (
        <SheetContent side={"right"} className="bg-background rounded-l-3xl">
            <SheetHeader>
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>

            <div className="flex justify-between items-center border-b-[0.1px] py-5">
                <h2 className="font-bold text-lg ">
                    Faça seu login!
                </h2>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl" size="icon">
                            <LogInIcon style={{ width: '24px', height: '24px' }} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] rounded-2xl">
                        <DialogContentLogin />
                    </DialogContent>
                </Dialog>
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
                <Button className="rounded-xl justify-start gap-2" variant="secondary" asChild>
                    <Link href={""} className="font-semibold">
                        <CalendarIcon style={{ width: '18px', height: '18px' }} />
                        Agendamentos
                    </Link>
                </Button>
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
        </SheetContent>
    );
}

export default MenuSheetContent;