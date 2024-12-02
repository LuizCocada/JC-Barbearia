'use client'

import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import MenuSheetContent from "./MenuSheetContent";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const SheetComponent = () => {

    const { data } = useSession()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [data]);


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button size={"icon"} variant={"link"} className="bg-input text-foreground rounded-lg p-1" asChild>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <MenuSheetContent />
        </Sheet>
    );
}

export default SheetComponent;