import { Card, CardContent } from "./ui/card"


const Footer = () => {
    return (
        <footer>
            <Card className="rounded-none border-t">
                <CardContent className="ritems-center px-2 py-3">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Copyright <span className="font-semibold">AncoSystem</span>
                    </p>
                </CardContent>
            </Card>
        </footer>
    )
}

export default Footer