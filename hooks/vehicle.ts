import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { publicApi } from "@/libs/axios";
import useSWR from "swr";

export default function useVehicle(id: string) {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<VehicleCardProps>(`/vehicle/${id}`, (url: string) =>
      publicApi.get(url).then((res) => res.data),
    );

  return { data, error, isLoading, isValidating, mutate };
}
