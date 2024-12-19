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
import { addTimeAvailable } from "@/actions/create/addTimeAvailable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    time: z.string().trim().min(4, {
        message: "Digite o horario"
    }),
});

const AddTimeForm = ({ onSuccessAddTime }: { onSuccessAddTime: () => void }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const newTimeAdded = `${data.time.slice(0, 2)}:${data.time.slice(2, 4)}`;
        try {
            await addTimeAvailable({ time: newTimeAdded });
            toast.success("Horário adicionado com sucesso");
            form.reset();
            onSuccessAddTime();
        } catch (err) {
            toast.error("Erro ao adicionar horário");
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
                        <InputOTP maxLength={4} {...field}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                <Button type="submit" className="w-full p-5 mt-5">
                    Adicionar
                </Button>
            </form>
        </Form>
    );
};

export default AddTimeForm;