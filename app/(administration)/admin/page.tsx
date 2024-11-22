"use client";

import { useSession } from "next-auth/react";


const AdminPage = () => {
    const { data } = useSession();

    return (
        <div>
            
        </div>
    )
};

export default AdminPage;
