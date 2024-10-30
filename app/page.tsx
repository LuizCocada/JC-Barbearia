import BookingItem from "@/components/BookingItem";
import CategoryItem from "@/components/CategoryItem";
import HeaderInputSearch from "@/components/HeaderInputSerch";
import { GetConfirmedBookings } from "@/data/GetConfirmedBookings";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

const Home = async () => {

  const session = await getServerSession(authOptions)
  const categorys = await db.category.findMany({})

  const ConfirmedBookings = await GetConfirmedBookings()

  return (
    <div>
      <HeaderInputSearch />

      <div className="border-b-[0.1px] border-muted-foreground">
        {session?.user &&
          (
            <>
              <div className="">
                <h2 className="text-xs font-bold px-5 pt-5">
                  AGENDAMENTOS
                </h2>
              </div>

              {ConfirmedBookings.length > 0 ? (
                <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden p-5">
                  {ConfirmedBookings.map(booking => <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />)}  {/*JSON para evitar error de DECIMAL */}
                </div>
              )
                :
                (
                  <div className="p-5">
                    <p className="text-sm text-gray-400">Não há agendamentos por enquanto...</p>
                  </div>
                )}
            </>
          )
        }
      </div>

      <div className="flex justify-center">
        <h2 className="font-bold mt-6 px-5">
          CATEGORIAS
        </h2>
      </div>

      <div className="px-10 p-5 space-y-7">
        {categorys.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>


    </div>
  );
}


export default Home