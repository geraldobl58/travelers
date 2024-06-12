import { AddHotelForm } from "@/components/add-hotel-form";

import { getHotelById } from "@/services/get-hotel-by-id";
import { auth } from "@clerk/nextjs";

interface HotelIdPageProps {
  params: {
    hotelId: string;
  };
}

const HotelIdPage = async ({ params }: HotelIdPageProps) => {
  const { userId } = auth();
  const hotel = await getHotelById(params.hotelId);

  if (!userId) {
    return (
      <>
        <div>Não Autenticado!</div>
      </>
    );
  }

  if (hotel && hotel.userId !== userId) {
    return (
      <>
        <div>Acesso negado.</div>
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl w-full mx-auto xl:px-20 px-4 py-4">
      <div>
        <AddHotelForm hotel={hotel} />
      </div>
    </div>
  );
};

export default HotelIdPage;
