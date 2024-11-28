import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import { MainSidebar } from "../components/(Dashboard)/MainSidebar";
import { CheckedProvider } from "@/hooks/context/CheckedContext";




const Layout = ({ children }: PropsWithChildren) => {

    return (
        <div>
            <div className="grid grid-cols-[15rem_1fr]">
                <MainSidebar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;