import VehicleCard from "@/components/molecules/vehicle-card/vehicle-card";
import { VehicleCardsProps } from "./types";

export function VehicleCards({ cards }: VehicleCardsProps) {
  return (
    <div className="grid lg:grid-cols-6">
      {cards.map((card, index) => (
        <VehicleCard {...card} key={index} />
      ))}
    </div>
  );
}
