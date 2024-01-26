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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { VehicleCardsProps } from "./types";
type ModalType = "edit" | "delete";

type ModalInfo = {
  title: string;
  description: string;
};
export function VehicleCards({ admin }: VehicleCardsProps) {
  const { data } = useVehicles();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>("edit");
  const [selectedVehicle, setSelectedVehicle] =
    useState<Omit<VehicleCardProps, "admin">>();

  const [newImages, setNewImages] = useState<string[]>([]);

  const onOpenModal = (type: ModalType) => {
    onOpen();

    setModalType(type);
  };

  const modalTexts: Record<ModalType, ModalInfo> = {
    delete: {
      title: "Você tem certeza que deseja deletar este veículo?",
      description: "Ao deletar um registro ele desaparecerá permanentemente.",
    },
    edit: {
      title: "Editar Veículo",
      description:
        "Basta alterar os campos que deseja e clicar em salvar alterações.",
    },
  };

  useEffect(() => {
    setNewImages(selectedVehicle?.images.map((item) => item.url) || []);
  }, [selectedVehicle]);

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {data?.map((card) => (
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

      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {modalTexts[modalType].title}
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <ModalBody>
              <p>{modalTexts[modalType].description}</p>

              {modalType == "edit" && (
                <>
                  <Input defaultValue={selectedVehicle?.name} label="Nome" />
                  <Input defaultValue={selectedVehicle?.brand} label="Marca" />
                  <Input defaultValue={selectedVehicle?.model} label="Modelo" />
                  <Input
                    defaultValue={selectedVehicle?.price.toString()}
                    label="Preço"
                  />

                  <div className="flex flex-wrap gap-2">
                    {newImages?.map((image, index) => (
                      <div key={image} className="relative">
                        <Image
                          className="cursor-pointer"
                          src={image}
                          width={200}
                          height={200}
                          radius="none"
                        />
                        <Button
                          onClick={() => {
                            setNewImages((prevState) =>
                              prevState.filter(
                                (prevImage) => prevImage !== image,
                              ),
                            );
                          }}
                          className="-tranlate-y-1/2 absolute right-0 top-0 z-20 translate-x-1/2"
                          isIconOnly
                          color="danger"
                          size="sm"
                        >
                          <Trash className="h-6 w-6" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <FileUploader
                    onFileLoaded={(base64) => {
                      setNewImages((prevState) =>
                        prevState.some((image) => image == base64)
                          ? prevState
                          : [...prevState, base64],
                      );
                      console.log({ base64 });
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
              <Button color="danger" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={onClose}>
                Salvar alterações
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
