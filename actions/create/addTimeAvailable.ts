'use server';

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
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