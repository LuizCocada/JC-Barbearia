import React, { PropsWithChildren } from "react";
import { MainSidebar } from "../components/(Dashboard)/MainSidebar";




const Layout = ({ children }: PropsWithChildren) => {

    return (
        <div>
            <div className="grid grid-cols-[15rem_1fr] h-screen">
                <MainSidebar />
                <main className="overflow-auto [&::-webkit-scrollbar]:hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;



