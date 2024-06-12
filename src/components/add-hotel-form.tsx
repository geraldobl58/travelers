/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Image from "next/image";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { toast } from "sonner";

import { Loader2, XCircle } from "lucide-react";

import { ICity, IState } from "country-state-city";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useLocation from "@/hooks/useLocation";

import { formSchema } from "@/schema/hotel";

import { UploadButton } from "@/lib/uploadthing";

import { HotelWithRooms } from "@/types";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null | undefined;
}

type HotelForm = z.infer<typeof formSchema>;

export const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();

  const countries = getAllCountries();

  const form = useForm<HotelForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      coutry: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPoll: false,
      coffeShop: false,
    },
  });

  useEffect(() => {
    const selectedCountry = form.watch("coutry");
    const countryStates = getCountryStates(selectedCountry);

    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch("coutry")]);

  useEffect(() => {
    const selectedCountry = form.watch("coutry");
    const selectedState = form.watch("state");
    const stateCities = getStateCities(selectedCountry, selectedState);

    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch("coutry"), form.watch("state")]);

  const onSubmit = (data: HotelForm) => {
    console.log(data);
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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">
        {hotel ? "Atualizar formulário atual" : "Adicionar novo registro"}
      </h2>
      <div className="bg-slate-100 rounded-lg p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="gym"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Academia</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spa"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Spa</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bar"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Bar</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="laundry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Lavanderia</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restaurant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Restaurante</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shopping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Shopping</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freeParking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Estacionamento Grátis</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bikeRental"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Aluguel de Bicicleta</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="movieNights"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Cinema</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="swimmingPoll"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Piscina</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coffeShop"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Cafeteria</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div>
              <h2 className="text-md text-muted-foreground font-semibold">
                Localização
              </h2>
              <div className="grid sm:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="coutry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Selecione o país"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((item) => (
                            <SelectItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        disabled={isLoading || states.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Selecione o estado"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((item) => (
                            <SelectItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <Select
                        disabled={isLoading || cities.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Selecione o cidade"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-1 grid-cols-1 mt-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do local</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descrição do local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        <div className="relative max-w-[400px] min-w-[400px] max-h-[400px] min-h-[400px]">
                          <Image
                            fill
                            alt="Hotel"
                            src={image}
                            className="object-contain"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => handleImageDelete(image)}
                            className="absolute right-2 top-[90px]"
                          >
                            {imageIsDeleting ? (
                              <Loader2 className="size-4" />
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
                            toast.error(
                              "Houve um erro ao realizado o uupload!"
                            );
                          }}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
