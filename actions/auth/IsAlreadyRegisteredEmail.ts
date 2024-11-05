'use server'

import { db } from "@/lib/prisma";

export async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
    // Check if there is any account with the given email, regardless of the provider
    const account = await db.account.findFirst({
        where: {
            user: {
                email: email,
            },
        },
        include: {
            user: true,
        },
    });

    // Return true if an account is found, otherwise false
    return account !== null;
}
