"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { BookOpenCheckIcon, HotelIcon, PlusIcon, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-full">
          <UserCog className="size-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push("/hotel/new")}
          className="cursor-pointer gap-2"
        >
          <PlusIcon className="size-4" /> Novo Registro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/my-hotels")}
          className="cursor-pointer gap-2"
        >
          <HotelIcon className="size-4" />
          Meus Hotéis
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/my-booking")}
          className="cursor-pointer gap-2"
        >
          <BookOpenCheckIcon className="size-4" />
          Minhas Reservas
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
