import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { api } from "@/libs/axios";
import useSWR from "swr";

export default function useVehicle(id: string) {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<VehicleCardProps>(`/vehicle/${id}`, (url: string) =>
      api.get(url).then((res) => res.data),
    );

  return { data, error, isLoading, isValidating, mutate };
}
