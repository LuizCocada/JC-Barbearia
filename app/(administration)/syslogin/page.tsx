"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("admin-credentials", {
            redirect: false,
            username,
            password,
        });

        if (res?.error) {
            setError("Credenciais inválidas.");
        } else {
            router.push("/admin/agendamentos");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 border rounded">
                <h2 className="mb-4 text-xl">Login JC-Barbearia</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-1">Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
