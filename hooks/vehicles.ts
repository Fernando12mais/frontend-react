import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { api } from "@/libs/axios";
import useSWR from "swr";

export default function useVehicles(search: string = "") {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    VehicleCardProps[]
  >(`/vehicle?search=${search}`, (url: string) =>
    api.get(url).then((res) => res.data),
  );

  return { data, error, isLoading, isValidating, mutate };
}
