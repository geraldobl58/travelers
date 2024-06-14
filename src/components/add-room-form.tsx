/* eslint-disable react-hooks/exhaustive-deps */
"uuse client";

import { useEffect, useState } from "react";

import { Form, useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Loader2, PencilLineIcon, XCircle } from "lucide-react";

import axios from "axios";

import { toast } from "sonner";

import { Hotel, Room } from "@prisma/client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { formSchema } from "@/schema/room";

import { UploadButton } from "@/lib/uploadthing";

interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogOpen: () => void;
}

type RoomForm = z.infer<typeof formSchema>;

export const AddRoomForm = ({
  hotel,
  room,
  handleDialogOpen,
}: AddRoomFormProps) => {
  const [image, setImage] = useState<string | undefined>(room?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<RoomForm>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathroomCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: "",
      beakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      tv: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProofed: false,
    },
  });

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  const onSubmit = (data: RoomForm) => {
    setIsLoading(true);

    if (hotel && room) {
      axios
        .patch(`/api/room/${room.id}`, data)
        .then((res) => {
          toast.success("Registro atualizado com sucesso!");
          router.refresh();
          handleDialogOpen();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Houve um erro ao atualizar o registro!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (!hotel?.id) {
        return;
      }

      axios
        .post("/api/room", { ...data, hotelId: hotel?.id })
        .then((res) => {
          toast.success("Registro criado com sucesso!");
          router.refresh();
          handleDialogOpen();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Houve um erro ao criar o registro!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);

    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast.success("Image excluida com sucesso.");
        }
      })
      .catch(() => {
        toast.error("Erro ao excluir imagem.");
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-6  overflow-auto h-[600px]">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="text-md text-muted-foreground font-semibold">
          Comodidades
        </h2>
        <div className="grid sm:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-y-4">
          <FormField
            control={form.control}
            name="roomService"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Serviço de quarto</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tv"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>TV</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balcony"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Sacada</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="freeWifi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Wifi grátis</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityView"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vista para cidade</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oceanView"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vista para praia</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="forestView"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vista para floresta</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mountainView"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vista para montanha</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="airCondition"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Ar condicionado</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="soundProofed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>À prova de som</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="roomPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="Preço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camas</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="Camas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hóspedes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Hóspedes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banheiros</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Banheiros"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="beakFastPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Café da manhã</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Café da manhã"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kingBed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camas King</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Camas king"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="queenBed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camas Queen</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Camas queen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center text-center bg-white p-6 rounded-md">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Realize o upload da imagem</FormLabel>
                <FormDescription>
                  Escolha sua melhor image para realizar o upload.
                </FormDescription>
                <FormControl>
                  {image ? (
                    <div className="relative">
                      <Image
                        width={1000}
                        height={1000}
                        alt="Hotel"
                        src={image}
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => handleImageDelete(image)}
                        className="absolute right-2 top-[10px]"
                      >
                        {imageIsDeleting ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <XCircle className="size-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImage(res[0].url);
                        toast.success("Upload realizado com sucesso!");
                      }}
                      onUploadError={(error: Error) => {
                        toast.error("Houve um erro ao realizado o uupload!");
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {room ? (
            <Button
              type="button"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Carregando...
                </>
              ) : (
                <>
                  <PencilLineIcon className="size-4 mr-2" />
                  Atualizar
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Carregando...
                </>
              ) : (
                <>
                  <PencilLineIcon className="size-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
