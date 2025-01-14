import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateTimeAvailable } from "@/actions/put/updateTimeAvailable";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


interface UpdateTimeFormProps {
    id: string;
    placeholder: string;
    onSuccessUpdateTime: () => void;
}


const formSchema = z.object({
    time: z.string().trim().min(4, {
        message: "Digite o horario"
    }),
});


const UpdateTimeForm = ({ id, placeholder, onSuccessUpdateTime }: UpdateTimeFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: placeholder.replace(":", ""),
        },
    });


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const newTimeAdded = `${data.time.slice(0, 2)}:${data.time.slice(2, 4)}`;
        try {
            await updateTimeAvailable({ id: id, time: newTimeAdded });
            toast.success("Horário atualizado com sucesso");
            form.reset();
            onSuccessUpdateTime();
        } catch (err) {
            if ((err as PrismaClientKnownRequestError).message === "UNIQUE_CONSTRAINT_VIOLATION") {
                toast.error("Horário já cadastrado");
                return;
            }
            toast.error("Erro ao atualizar horário");
            console.error(err);
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <InputOTP maxLength={4} {...field} className="px-2 md:px-0">
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="w-20 md:w-30" />
                                <InputOTPSlot index={1} className="w-20 md:w-30" />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} className="w-20 md:w-30" />
                                <InputOTPSlot index={3} className="w-20 md:w-30" />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                <Button type="submit" className="w-full p-5 mt-5">
                    Atualizar
                </Button>
            </form>
        </Form>
    )
}


export default UpdateTimeForm;