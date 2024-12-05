import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface HorarioCardProps {
    description: string;
    buttonText: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

const HourCard: React.FC<HorarioCardProps> = ({ icon, description, buttonText, onClick }) => {
    return (
        <div className="items-center flex flex-col">
            <Card className="min-w-[70%] max-w-[70%] rounded-xl bg-card border-none p-2">
                <CardContent className="p-0 px-1 pt-1">
                    <div className="flex flex-col items-center text-center">
                        {icon}
                        <p className="font-medium underline">{description}</p>
                    </div>
                    <div className="w-full pt-3">
                        <Button className="w-full py-5" onClick={onClick}>{buttonText}</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HourCard;