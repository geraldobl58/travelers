import { Details } from "../compoennts/details";

import { getHotelById } from "@/services/get-hotel-by-id";

interface HotelIdPageProps {
  params: {
    hotelId: string;
  };
}

const HotelIdPage = async ({ params }: HotelIdPageProps) => {
  const hotel = await getHotelById(params.hotelId);
  return (
    <div>
      <Details hotel={hotel} />
    </div>
  );
};

export default HotelIdPage;
