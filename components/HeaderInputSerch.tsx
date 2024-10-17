"use client"

import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar, MenuIcon, SearchIcon, SearchXIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SheetComponent from "./SheetComponent";


const formSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Digite algo para buscar"
    }),
})


const HeaderInputSearch = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(``) //make route
    }

    return (
        <div className="p-3 pb-6 text-background bg-foreground">
            <div className="py-3 px-2 flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Olá, Seja bem vindo!
                    </h2>
                    <p className="text-sm flex gap-2 items-center">
                        <Calendar size={15} className="text-primary" />
                        Quarta, 16 de Outubro
                    </p>
                </div>
                <SheetComponent />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center">
                    <div className="flex w-full mx-5 rounded-xl">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="bg-popover border-none p-6 rounded-xl rounded-r-none"
                                            placeholder="Buscar por serviços"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="p-6 rounded-xl bg-popover border-none rounded-l-none">
                            <SearchIcon className="text-muted-foreground" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default HeaderInputSearch;


