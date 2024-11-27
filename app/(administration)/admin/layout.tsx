'use server'

import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import { MainSidebar } from "../components/MainSidebar";




const Layout = ({ children }: PropsWithChildren) => {

    return (
        <div>
            <div className="grid grid-cols-[15rem_1fr]">
                <MainSidebar/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;