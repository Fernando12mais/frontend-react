export type VehicleCardProps = {
  id: number;
  price: number;
  brand: string;
  model: string;
  name: string;
  images: { url: string; id: number; file_id: string }[];
  admin?: {
    delete: (VehicleCardProps: Omit<VehicleCardProps, "admin">) => void;
    edit: (VehicleCardProps: Omit<VehicleCardProps, "admin">) => void;
  };
};
