import Image from "next/image";

import { Booking } from "@prisma/client";

import useLocation from "@/hooks/useLocation";

import { HotelWithRooms } from "@/types";

interface DetailsProps {
  hotel: HotelWithRooms;
  bookings?: Booking[];
}

export const Details = ({ hotel, bookings }: DetailsProps) => {
  const { getCountryByCode, getStateByCode } = useLocation();

  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);

  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[200px] md:h-[400px] rounded-lg">
        <Image
          fill
          alt={hotel.title}
          src={hotel.image}
          className="object-cover"
        />
      </div>
    </div>
  );
};
