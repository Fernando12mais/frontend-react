import { Button } from "@nextui-org/react";
import NextImage from "next/image";
import { VehicleCardProps } from "./types";

export default function VehicleCard({
  brand,
  model,
  name,
  picture,
  price,
}: VehicleCardProps) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

  return (
    <div className="rounded bg-slate-50 p-2 text-slate-800">
      <h2>{name}</h2>
      <NextImage src={picture} alt="Foto do veículo" width={400} height={400} />
      <ul>
        <li>{currency.format(price)}</li>
        <li>{brand}</li>
        <li>{model}</li>
      </ul>
      <Button>Comprar</Button>
    </div>
  );
}
