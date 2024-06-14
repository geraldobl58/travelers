"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  BathIcon,
  BedIcon,
  Loader2,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddRoomForm } from "./add-room-form";

import { Booking, Hotel, Room } from "@prisma/client";

import { formattedPrice } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  booking?: Booking[];
}

export const RoomCard = ({ hotel, room, booking = [] }: RoomCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isHotelDetails = pathname.includes("details");

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleRoonDelete = (room: Room) => {
    setIsLoading(true);

    const imageKey = room.image.substring(room.image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then(() => {
        axios
          .delete(`/api/room/${room.id}`)
          .then(() => {
            router.refresh();
            toast.success("Registro excluido com sucesso!");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Houve um erro ao excluir o registro!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Houve um erro ao excluir o registro!");
      });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Camas</TableHead>
            <TableHead>Hóspedes</TableHead>
            <TableHead>Banheiros</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{room.title}</TableCell>
            <TableCell>{room.description}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <BedIcon /> <span>{room.bedCount}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <UserIcon /> <span>{room.guestCount}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <BathIcon /> <span>{room.bathroomCount}</span>
              </div>
            </TableCell>
            <TableCell>
              {formattedPrice(room.roomPrice)}/24hrs
              <Separator />
              Café da manhã{" - "}
              {!!room.beakFastPrice && formattedPrice(room.beakFastPrice)}
            </TableCell>
            <TableCell>
              {isHotelDetails ? (
                <div className="flex items-center gap-4">
                  <UserIcon /> <span>{room.guestCount}</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={() => handleRoonDelete(room)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin mr-2" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        <TrashIcon className="size-4 mr-2" />
                        Excluir
                      </>
                    )}
                  </Button>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <Button type="button" variant="outline">
                        <PencilIcon className="size-4 mr-2" /> Atualizar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px] w-[90%]">
                      <DialogHeader>
                        Atualizar detalhes sobre seu quarto.
                      </DialogHeader>
                      <AddRoomForm
                        hotel={hotel}
                        room={room}
                        handleDialogOpen={handleDialogOpen}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
