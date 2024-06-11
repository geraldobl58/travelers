import { SearchInput } from "./search-input";

export const Banner = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 h-[400px] bg-[url('/banner.png')] bg-cover">
        <h1 className="text-6xl text-white">Encontre sua próxima viagem</h1>
        <h3 className="text-2xl text-white">
          Obtenha os melhores preços em mais de 2.000.000 de propriedades em
          todo o mundo.
        </h3>
        <SearchInput />
      </div>
    </div>
  );
};
