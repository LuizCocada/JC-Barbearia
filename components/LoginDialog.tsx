'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";

const LoginDialog = () => {
    const [name, setName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleLoginWithGoogle = () => signIn('google');

    const handleLoginWithCredentials = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            name,
            telefone,
            email,
            redirect: false,
        });

        if (result?.error) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        } else {
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
            </DialogHeader>

            {/* Formulário para login com telefone e email */}
            <form onSubmit={handleLoginWithCredentials} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="flex gap-1 rounded-xl">
                    <p className="font-bold">Entrar com Telefone e Email</p>
                </Button>
            </form>

            <Button className="flex gap-1 rounded-xl mt-4" onClick={handleLoginWithGoogle}>
                <Image src={"/googleIcon.svg"} width={16} height={16} alt="icon Google" />
                <p className="font-bold">Google</p>
            </Button>
        </>
    );
}

export default LoginDialog;
