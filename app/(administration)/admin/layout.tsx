import React, { PropsWithChildren } from "react";
import { MainSidebar } from "../_components/(Dashboard)/MainSidebar";


const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="h-screen flex flex-col lg:flex-row">
            {/* Sidebar - escondida por padrão em telas pequenas */}
            <div className="w-full lg:w-[15rem] bg-white border-r">
                <MainSidebar />
            </div>
            
            {/* Main content */}
            <main className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
                {children}
            </main>
        </div>
    );
};

export default Layout;


