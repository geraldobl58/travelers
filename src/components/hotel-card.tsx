"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Dumbbell, MapPin, Waves } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import useLocation from "@/hooks/useLocation";

import { formattedPrice } from "@/lib/utils";

import { HotelWithRooms } from "@/types";

interface HotelListProps {
  hotel: HotelWithRooms;
}

export const HotelCard = ({ hotel }: HotelListProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { getCountryByCode } = useLocation();

  const country = getCountryByCode(hotel.country);

  const isMyHotels = pathname.includes("my-hotels");

  const handleDetails = () => {
    return !isMyHotels && router.push(`/details/${hotel.id}`);
  };

  return (
    <div className="shadow-md cursor-pointer">
      <Image alt={hotel.title} width={400} height={400} src={hotel.image} />
      <div className="p-2">
        <h3 className="text-lg font-semibold">{hotel.title}</h3>
        <p className="text-sm text-primary">{hotel.description}</p>
        <Separator className="mt-2 mb-2" />
        <div className="flex items-center justify-between mt-2 mb-2">
          <p className="text-sm text-muted-foreground">{country?.name}</p>
          {hotel?.rooms[0].roomPrice && (
            <>
              <p className="text-sm text-muted-foreground">
                {formattedPrice(hotel?.rooms[0].roomPrice)}/
                <span className="text-xs">24hrs</span>
              </p>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-4 mb-2">
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4" />
            {hotel.city}
          </p>
          <p className="flex items-center gap-2 text-sm">
            {hotel.swimmingPoll && (
              <>
                <Waves className="size-4" />
                {hotel.swimmingPoll} Piscina
              </>
            )}
          </p>
          <p className="flex items-center gap-2 text-sm">
            {hotel.swimmingPoll && (
              <>
                <Dumbbell className="size-4" />
                {hotel.gym} Academia
              </>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mt-8">
          {isMyHotels && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/hotel/${hotel.id}`)}
              >
                Ver mais
              </Button>
            </>
          )}
          <Button size="sm" onClick={handleDetails}>
            Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};
