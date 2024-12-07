'use server';

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface TimeAvailableProps {
    time: string;
}


export const addTimeAvailable = async ({time}: TimeAvailableProps) => {
    await db.times.create({
        data: {
            time: time,
        }
    });

    revalidatePath("/admin");
}