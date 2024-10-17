

import InputSearch from "@/components/InputSerch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
    return (
        <div>
            <InputSearch />
            <div className="flex flex-col min-h-screen bg-muted">
                <div className="absolute top-20 left-4">
                    <Link href={"/"}>
                        <Button size={"icon"} className="bg-muted">
                            <ChevronLeft />
                        </Button>
                    </Link>
                </div>
                <div className="bg-primary w-full flex justify-center">
                    <Image
                        src={"/cabelo.svg"} width={260} height={260} className="object-cover"
                        alt={"imagem cabelo"}
                    />
                </div>

                <Card className="flex flex-1 rounded-none mt-2 rounded-t-xl border-t">
                    <CardContent>
                        
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


export default Services