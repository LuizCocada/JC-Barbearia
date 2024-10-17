
import SheetComponent from "@/components/SheetComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, MenuIcon } from "lucide-react";
import Link from "next/link";

const Services = () => {
    return (
        <div>
            <Card className="rounded-none border-none text-background bg-foreground">
                <CardContent className="flex items-center justify-between p-5">
                    <Link href={"/"}>
                        <Button size={"icon"} className="bg-popover text-secondary rounded-lg p-1" asChild>
                            <ChevronLeft />
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold">Cortes</h2>
                    <SheetComponent />
                </CardContent>
            </Card>

            <div className="">

            </div>
        </div>
    );
};


export default Services