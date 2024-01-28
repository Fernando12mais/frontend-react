import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { Filter } from "./types";
import { formatCurrency } from "@/utils/money";

export const getFilteredVehicles = (
  vehicles: VehicleCardProps[],
  filter: Filter,
) => {
  return vehicles?.filter((vehicle) =>
    filter ? vehicle.price > filter.min && vehicle.price < filter.max : true,
  );
};

export const filterValues = Array.from({ length: 30 }).map((value, index) => ({
  label: formatCurrency(10000 * (index + 1)),
  value: 10000 * (index + 1),
}));
