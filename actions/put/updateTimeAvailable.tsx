'use server';

import { db } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

interface TimeAvailableProps {
    id: string;
    time: string;
}


export const updateTimeAvailable = async ({time, id}: TimeAvailableProps) => {
    try {
        await db.times.update({
            data: {
                time: time,
            },
            where: {
                id: id,
            },
        });

        revalidatePath("/admin");
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error("UNIQUE_CONSTRAINT_VIOLATION");
        } else {
            throw error;
        }
    }
}

