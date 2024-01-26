import { VehicleCardProps } from "@/components/molecules/vehicle-card/types";
import { publicApi, privateApi } from "@/libs/axios";
import useSWR from "swr";

export default function useVehicles() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    VehicleCardProps[]
  >("/vehicle", (url: string) => privateApi.get(url).then((res) => res.data));

  return { data, error, isLoading, isValidating, mutate };
}
