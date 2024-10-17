"use client"

import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MenuIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";


const formSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Digite algo para buscar"
    }),
})


const InputSearch = () => {

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
        <div className="bg-primary px-2 py-4 border-b">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center">
                    <div className="flex w-full gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size={"icon"} variant={"link"} className="rounded-none text-secondary-foreground" asChild>
                                    <MenuIcon />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>

                            </SheetContent>
                            {/* Criar component MenuContent */}
                        </Sheet>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="bg-background rounded-xl"
                                            placeholder="Buscar por serviços"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="p-3 rounded-xl bg-background">
                            <SearchIcon className="text-muted-foreground" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default InputSearch;


