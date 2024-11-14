import BookingItem from "@/components/BookingItem";
import CategoryItem from "@/components/CategoryItem";
import HeaderInputSearch from "@/components/HeaderInputSerch";
import ServicesMain from "@/components/ServicesMain";
import { Card, CardContent } from "@/components/ui/card";
import { GetConfirmedBookings } from "@/data/GetConfirmedBookings";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Home = async () => {

  const session = await getServerSession(authOptions)
  const categorys = await db.category.findMany({})

  const ConfirmedBookings = await GetConfirmedBookings()
  const services = await db.service.findMany({
    include: {
      category: true
    }
  })

  return (
    <div className="bg-secondary">
      <HeaderInputSearch />

      {session?.user &&
        (
          <div className="border-b-[0.1px] border-muted-foreground pb-1">
            <div className="mt-2 w-fit">
              <Link href={"/bookings"}>
                <h2 className="text-xs font-bold px-5 pt-5 sm:text-sm md:text-xl hover:underline">
                  AGENDAMENTOS
                </h2>
              </Link>
            </div>

            {ConfirmedBookings.length > 0 ? (
              <div className="flex overflow-x-auto gap-3 p-5">
                {ConfirmedBookings.map(booking => (
                  <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
                ))}
              </div>
            )
              :
              (
                <div className="p-5">
                  <p className="text-sm text-gray-400">Não há agendamentos por enquanto...</p>
                </div>
              )}
          </div>
        )
      }

      <div className="flex justify-center px-5">
        <Card className="rounded-3xl border-none m-2 bg-popover text-background mt-8 min-w-[70%] sm:min-w-[80%] mb-8">
          <CardContent className="p-3 pt-2 mb-2">
            <div className="flex justify-center m-3 pb-3">
              <p className="text-sm font-bold px-5 md:text-xl">
                CATEGORIAS
              </p>
            </div>
            <div className="flex items-center justify-around">
              {categorys.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xs font-bold flex items-center px-5 pt-5 sm:text-sm md:text-xl border-t-[0.1px] border-muted-foreground">
        NOSSOS SERVIÇOS
      </h2>

      <div className="flex flex-col gap-4 p-8 sm:grid grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <ServicesMain key={service.id} service={service} />
        ))}
      </div>

    </div>
  );
}


export default Home