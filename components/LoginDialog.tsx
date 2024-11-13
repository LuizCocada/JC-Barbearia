'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn } from "next-auth/react";
import { Input } from "./ui/input";
import { LogInIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TesteOnlyContentLogin from "./testeOnlyContentLogin";

const LoginDialog = () => {

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="rounded" size="sm">
                        Entrar
                        <LogInIcon />
                    </Button>
                </DialogTrigger>
                <TesteOnlyContentLogin />
            </Dialog>
        </>
    );
}

export default LoginDialog;


































// 'use client'

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { signIn } from "next-auth/react";
// import { Input } from "./ui/input";
// import { AlertCircle, LogInIcon } from "lucide-react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// const LoginDialog = () => {
//     const [name, setName] = useState("");
//     const [number, setNumber] = useState("");
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [next, setNext] = useState(false);

//     const router = useRouter();

//     const resetDialogLogin = () => {
//         setName("");
//         setNumber("");
//         setIsDialogOpen(false);
//         setNext(false);
//     }


//     const handleLoginWithCredentials = async () => {

//         if (name == "" || number == "") {
//             throw new Error("Preencha todos os campos!");
//         }

//         const result = await signIn('credentials', {
//             redirect: false,
//             name,
//             number,
//         });

//         router.refresh();
//         resetDialogLogin();
//         toast.success("Login realizado com sucesso!");
//         return result;
//     };

//     return (
//         <>
//             <Dialog onOpenChange={resetDialogLogin}>
//                 <DialogTrigger asChild>
//                     <Button className="rounded" size="sm" onClick={() => setIsDialogOpen(true)}>
//                         Entrar
//                         <LogInIcon />
//                     </Button>
//                 </DialogTrigger>
//                 <DialogContent className="w-[90%] rounded-2xl">
//                     <DialogHeader>
//                         <DialogTitle className="text-start mb-2">
//                             Faça seu login na plataforma
//                         </DialogTitle>
//                     </DialogHeader>

//                     <div className="flex flex-col gap-2">
//                         {next == false ? (
//                             <>
//                                 <DialogDescription>
//                                     &nbsp; Insira seu número de contato
//                                 </DialogDescription>
//                                 <Input
//                                     type="cellphone"
//                                     placeholder="(85) 9 9999-9999"
//                                     value={number}
//                                     onChange={(e) => setNumber(e.target.value)}
//                                 />
//                             </>
//                         ) : (
//                             <>
//                                 <DialogDescription>
//                                     &nbsp; Insira o seu melhor nome!
//                                 </DialogDescription>
//                                 <Input
//                                     type="text"
//                                     placeholder="Seu nome"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </>
//                         )}



//                         <Button
//                             className="mt-2 rounded-xl"
//                             onClick={next == false && number != undefined ? () => setNext(true) : handleLoginWithCredentials}
//                         >
//                             {next == false ? "Próximo" : "Entrar"}
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }

// export default LoginDialog;