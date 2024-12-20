import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { GetConfirmedBookings } from "@/data/GetConfirmedBookings"
import { getConcludedBookings } from "@/data/GetConcludedBookings"
import { authOptions } from "@/lib/authOptions"
import BookingItem from "@/components/BookingItem"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, BookmarkCheck, BookmarkX, CircleOff } from "lucide-react"


const Bookings = async () => {

    const session = await getServerSession(authOptions) //usuario logado.
    if (!session?.user) {
        return notFound()//TODO: mostrar popUp de login
    }

    const ConfirmedBookings = await GetConfirmedBookings()
    const ConcludedBookings = await getConcludedBookings()

    return (
        <>
            <div className="p-5 space-y-6">

                <Card className="flex items-center gap-5 p-5 bg-card border-none">
                    <Link href={"/"}>
                        <Button size={"icon"} className="bg-popover text-secondary rounded-lg p-1" asChild>
                            <ChevronLeft />
                        </Button>
                    </Link>
                    <h2 className="font-bold text-xl">Agendamentos</h2>
                </Card>

                <div className="space-y-3">
                    <div className="space-y-3">
                        {ConfirmedBookings.length > 0 ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm">CONFIRMADOS</p>
                                    <BookmarkCheck className="w-[25px] h-[25px] text-background" fill="green" />
                                </div>
                                {ConfirmedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} />
                                ))}
                            </>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold">
                                <CircleOff />
                                <p>Você não tem agendamentos confirmados</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    {ConcludedBookings.length > 0 && (
                        <>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-400">
                                    FINALIZADOS
                                </p>
                                <BookmarkX className="w-[25px] h-[25px] text-background" fill="red" />
                            </div>
                            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
                                {ConcludedBookings.map((booking) => (
                                    <BookingItem key={booking.id} booking={booking} /> //ou passamos service={booking.service} e recebemos em BookingItem service como prop.
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Bookings



// diferença entre usar getServerSession e useSession é que getServerSession é usado no lado do servidor
// enquanto o useSession no lado do client.