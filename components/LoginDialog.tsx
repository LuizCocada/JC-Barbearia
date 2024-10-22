'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const LoginDialog = () => {

    const handleLoginWithGoogle = () => signIn('google');

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
            </DialogHeader>
            <Button className="flex gap-1 rounded-xl" onClick={handleLoginWithGoogle}> {/* ONCLICK DE LOGIN VIRÁ AQUI*/}
                <Image src={"/googleIcon.svg"} width={16} height={16} alt="icon Google" />
                <p className="font-bold">Google</p>
            </Button>
        </>
    );
}

export default LoginDialog;