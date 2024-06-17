import { HotelCard } from "./hotel-card";

import { HotelWithRooms } from "@/types";

interface HotelListProps {
  hotels: HotelWithRooms[];
}

export const HotelList = ({ hotels }: HotelListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};
