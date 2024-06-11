"use client";

import { Input } from "./ui/input";

export const SearchInput = () => {
  return (
    <div className="flex max-w-screen-2xl w-full mx-auto gap-4">
      <Input placeholder="Buscar" />
    </div>
  );
};
