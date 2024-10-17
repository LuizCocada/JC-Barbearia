import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import MenuSheetContent from "./MenuSheetContent";

const SheetComponent = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={"icon"} variant={"link"} className="bg-popover text-secondary rounded-lg p-1" asChild>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <MenuSheetContent />
        </Sheet>
    );
}

export default SheetComponent;