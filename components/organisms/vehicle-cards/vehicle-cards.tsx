"use client";

import { FileUploader } from "@/components/atoms/file-uploader";
import Trash from "@/components/icons/trash";
import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import VehicleCard from "@/components/molecules/vehicle-card/vehicle-card";
import useVehicles from "@/hooks/vehicles";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Image,
  Chip,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { VehicleCardsProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  VehicleSchema,
  updateVehicleSchema,
  vehicleSchema,
} from "@/validations/vehicle";
import useSWRMutation from "swr/mutation";
import { api } from "@/libs/axios";
import Search from "./search";
type ModalType = "edit" | "delete" | "add";

type ModalInfo = {
  title: string;
  description: string;
  submit: string;
};
export function VehicleCards({ admin }: VehicleCardsProps) {
  const [search, setSearch] = useState("");
  const { data, mutate } = useVehicles(search);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>("edit");
  const [selectedVehicle, setSelectedVehicle] =
    useState<Omit<VehicleCardProps, "admin">>();

  const getFetcher = () => {
    if (modalType == "edit") {
      return {
        url: "/vehicle",
        fetcher: (url: string, { arg }: { arg: VehicleSchema }) =>
          api.put(url, arg).then((res) => res.data),
      };
    }
    if (modalType == "delete") {
      return {
        url: `/vehicle/${selectedVehicle?.id}`,
        fetcher: (url: string) => api.delete(url).then((res) => res.data),
      };
    }

    return {
      url: "/vehicle",
      fetcher: (url: string, { arg }: { arg: VehicleSchema }) =>
        api.post(url, arg).then((res) => res.data),
    };
  };
  const { url, fetcher } = getFetcher();
  const { trigger, isMutating: isLoading } = useSWRMutation(url, fetcher);

  const onOpenModal = (type: ModalType) => {
    onOpen();
    setModalType(type);
    reset();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<VehicleSchema>({
    resolver: zodResolver(
      modalType == "add" ? vehicleSchema : updateVehicleSchema,
    ),
  });

  const { append, remove, replace, fields } = useFieldArray({
    control,
    name: "images",
  });

  const modalTexts: Record<ModalType, ModalInfo> = {
    delete: {
      title: "Você tem certeza que deseja deletar este veículo?",
      description: "Ao deletar um registro ele desaparecerá permanentemente.",
      submit: "Deletar",
    },
    edit: {
      title: "Editar Veículo",
      description:
        "Basta alterar os campos que deseja e clicar em salvar alterações.",
      submit: "Editar",
    },
    add: {
      title: "Adicionar veículo",
      description: "Basta preencher os campos e clicar em salvar alterações",
      submit: "Adicionar",
    },
  };

  const imagesToDelete = selectedVehicle?.images.filter((image) =>
    fields.every((fieldImage) => fieldImage.url !== image.url),
  );

  const onSubmit = handleSubmit(async (data) => {
    await trigger({ ...data, id: selectedVehicle?.id });
    if (modalType == "edit" && imagesToDelete?.length) {
      await api.delete(
        `/vehicle/images/${imagesToDelete.map((image) => image.file_id).join(",")}`,
      );
    }
    onClose();
    await mutate();
  });

  const skeletons = Array.from({ length: 8 });

  useEffect(() => {
    replace(selectedVehicle?.images || []);
  }, [replace, selectedVehicle]);

  return (
    <>
      <Search
        onSearchSubmit={(value) => {
          setSearch(value);
        }}
      />
      <div className="flex flex-col gap-3">
        {admin && (
          <Button
            onClick={() => {
              onOpenModal("add");
              setSelectedVehicle(undefined);
            }}
            className="ms-auto"
            color="primary"
          >
            Adicionar veículo
          </Button>
        )}
        <div className="grid gap-4 lg:grid-cols-4">
          {data?.map((card, index) => (
            <VehicleCard
              {...card}
              admin={
                admin
                  ? {
                      delete: (vehicle) => {
                        onOpenModal("delete");
                        setSelectedVehicle(vehicle);
                      },
                      edit: (vehicle) => {
                        onOpenModal("edit");
                        setSelectedVehicle(vehicle);
                      },
                    }
                  : undefined
              }
              key={card.id}
            />
          ))}
          {!data &&
            skeletons.map((skeleton, index) => (
              <Skeleton
                className="h-full min-h-[450px] w-full  rounded-lg"
                key={index}
              />
            ))}
        </div>

        <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {modalTexts[modalType].title}
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <p>{modalTexts[modalType].description}</p>

                {(modalType == "add" || modalType == "edit") && (
                  <>
                    <Input
                      errorMessage={errors.name?.message}
                      {...register("name")}
                      defaultValue={selectedVehicle?.name}
                      label="Nome"
                    />
                    <Input
                      errorMessage={errors.brand?.message}
                      {...register("brand")}
                      defaultValue={selectedVehicle?.brand}
                      label="Marca"
                    />
                    <Input
                      errorMessage={errors.model?.message}
                      {...register("model")}
                      defaultValue={selectedVehicle?.model}
                      label="Modelo"
                    />
                    <Input
                      errorMessage={errors.price?.message}
                      {...register("price")}
                      defaultValue={selectedVehicle?.price.toString()}
                      label="Preço"
                      type="number"
                      step={50}
                    />

                    <div className="flex flex-wrap gap-2">
                      {fields?.map((image, index) => (
                        <div key={image.id} className="relative">
                          <Image
                            className="cursor-pointer"
                            src={image.url}
                            width={200}
                            height={200}
                            radius="none"
                            alt="new-image"
                          />
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                            className="-tranlate-y-1/2 absolute right-0 top-0 z-20 translate-x-1/2"
                            isIconOnly
                            color={"danger"}
                            size="sm"
                          >
                            <Trash className="h-6 w-6" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <FileUploader
                      onFileLoaded={(base64) => {
                        if (fields.some((image) => image.url == base64)) return;
                        append({
                          id: Math.round(Math.random() * 9999),
                          url: base64,
                        });
                      }}
                    >
                      <Chip
                        className="cursor-pointer"
                        radius="sm"
                        color="primary"
                      >
                        Adicionar imagem
                      </Chip>
                    </FileUploader>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  color={modalType == "delete" ? "primary" : "danger"}
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color={modalType != "delete" ? "primary" : "danger"}
                  isLoading={isLoading}
                  type="submit"
                >
                  {!isLoading ? modalTexts[modalType].submit : "Salvando"}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
