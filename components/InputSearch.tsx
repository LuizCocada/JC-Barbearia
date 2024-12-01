"use client"

import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

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
        router.push(`/services?title=${data.title}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input className="bg-input border-none rounded-xl p-5 text-background"
                                    placeholder="Buscar por serviços"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size={"icon"} className="rounded-xl p-5">
                    <SearchIcon style={{ width: '24px', height: '24px' }} />
                </Button>
            </form>
        </Form>
    );
}

export default InputSearch;