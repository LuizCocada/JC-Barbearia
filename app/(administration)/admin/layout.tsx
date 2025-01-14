import React, { PropsWithChildren } from "react";
import { MainSidebar } from "../_components/(Dashboard)/MainSidebar";


const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="h-screen flex flex-col lg:flex-row">

            <div className="w-full lg:w-[15rem]">
                <MainSidebar />
            </div>

            <main className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
                {children}
            </main>

        </div>
    );
};

export default Layout;


