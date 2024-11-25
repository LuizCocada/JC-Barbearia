'use server'

import React, { createContext, PropsWithChildren } from "react";
import Header from "../components/Header";
import { getTodayBookings } from "@/actions/getTodayBookings";
import { getAllTodayBookings } from "@/actions/getAllTodayBookings";
import { Booking } from "@prisma/client";




const Layout = async ({ children }: PropsWithChildren) => {

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Layout;