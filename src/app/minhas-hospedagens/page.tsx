import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HotelListItem from "@/src/components/HotelListItem";
import Link from "@/src/components/Link";
import { getHotelByOwner } from "../api/hotels/actions";

export default async function MinhasHospedagensPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotels = await getHotelByOwner();

  return (
    <div className="py-20">
      <section className="w-full my-4">
        <Link href="/perfil">Voltar</Link>
      </section>
      <section className="flex justify-end my-8">
        <Link href="/minhas-hospedagens/cadastrar">Nova hospedagem</Link>
      </section>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 mt-4">
        {hotels.map((hotel) => (
          <HotelListItem hotel={hotel} key={hotel.id} />
        ))}
      </section>
    </div>
  );
}