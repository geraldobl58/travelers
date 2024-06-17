import { Banner } from "@/components/banner";
import { HotelList } from "@/components/hotel-list";

import { getHotels } from "@/services/get-hotels";

interface HomeProps {
  searchParams: {
    title: string;
    country: string;
    state: string;
    city: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const hotels = await getHotels(searchParams);

  if (!hotels) {
    return (
      <div>
        <div>Não foi encontrado nenhum registro!</div>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <div className="max-w-screen-2xl mx-auto gap-4 mt-4">
        <HotelList hotels={hotels} />
      </div>
    </>
  );
};

export default Home;
