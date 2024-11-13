'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ca } from "date-fns/locale";

const TesteOnlyContentLogin = () => {


    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [next, setNext] = useState(false);

    const router = useRouter();

    const resetDialogLogin = () => {
        setName("");
        setNumber("");
        setNext(false);
    }


    const handleLoginWithCredentials = async () => {

        if (name == "" || number == "") {
            throw new Error("Preencha todos os campos!");
        }

        try{
            const result = await signIn('credentials', {
                redirect: false,
                name,
                number,
            });
    
            router.refresh();
            resetDialogLogin();
            toast.success("Login realizado com sucesso!");
            return result;
        }
        catch(err){
            toast.error("Error inesperado ao realizar login!");
            return err;
        }
    };




    return (
        <DialogContent className="w-[90%] rounded-2xl">
            <DialogHeader>
                <DialogTitle className="text-start mb-2">
                    Faça seu login na plataforma
                </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2">
                {next == false ? (
                    <>
                        <DialogDescription>
                            &nbsp; Insira seu número de contato
                        </DialogDescription>
                        <Input
                            type="cellphone"
                            placeholder="(85) 9 9999-9999"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <DialogDescription>
                            &nbsp; Insira o seu melhor nome!
                        </DialogDescription>
                        <Input
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </>
                )}



                <Button
                    className="mt-2 rounded-xl"
                    disabled={number == "" || (next == true && name == "")}
                    onClick={next == false && number != undefined ? () => setNext(true) : handleLoginWithCredentials}
                >
                    {next == false ? "Próximo" : "Entrar"}
                </Button>
            </div>
        </DialogContent>
    )
}

export default TesteOnlyContentLogin;