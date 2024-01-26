import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { VehicleCardProps } from "./types";
import { Link, Image } from "@nextui-org/react";
import Pencil from "@/components/icons/pencil";
import Trash from "@/components/icons/trash";
import NoImage from "@/components/icons/no-image";

export default function VehicleCard({
  brand,
  id,
  model,
  name,
  images,
  price,
  admin,
}: VehicleCardProps) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

  return (
    <Card className="light">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between gap-3">
          <h2 className="line-clamp-1 flex-1">{name}</h2>
          {admin && (
            <span className="my-2 flex gap-3">
              <Button
                onClick={() =>
                  admin.edit({ brand, id, name, images, price, model })
                }
                className="p-1"
                isIconOnly
                color="primary"
              >
                <Pencil />
              </Button>
              <Button
                onClick={() =>
                  admin.delete({
                    brand,
                    id,
                    name,
                    images,
                    price,
                    model,
                  })
                }
                className="p-1"
                isIconOnly
                color="danger"
              >
                <Trash />
              </Button>
            </span>
          )}
        </div>
        <Link href={`/vehicle/${id}`} className="my-auto">
          {images[0]?.url ? (
            <Image
              src={images[0]?.url}
              alt="Foto do veículo"
              width={600}
              height={600}
              className="h-full w-full rounded"
            />
          ) : (
            <NoImage />
          )}
        </Link>

        <ul className="my-4 flex flex-wrap gap-2">
          <Chip variant="bordered" as="li" color="success" size="lg">
            {currency.format(price)}
          </Chip>
          <Chip as="li" color="primary">
            {brand}
          </Chip>
          <Chip as="li" color="default">
            {model}
          </Chip>
        </ul>
        <Button fullWidth color="success">
          Comprar
        </Button>
      </CardBody>
    </Card>
  );
}
