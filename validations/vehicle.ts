import z from "zod";

export const vehicleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Qual o nome do veículo?").default(""),
  brand: z.string().min(1, "Qual a marca do veículo?").default(""),
  model: z.string().min(1, "Qual o modelo do veículo?").default(""),
  price: z.string().min(1, "Qual o preço do veículo?").default(""),
  images: z.array(
    z.object({
      url: z.string(),
      id: z.number(),
    }),
  ),
});

export const updateVehicleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Qual o nome do veículo?").default("").optional(),
  brand: z.string().min(1, "Qual a marca do veículo?").default("").optional(),
  model: z.string().min(1, "Qual o modelo do veículo?").default("").optional(),
  price: z.string().min(1, "Qual o preço do veículo?").default("").optional(),
  images: z.array(
    z.object({
      url: z.string(),
      id: z.number(),
    }),
  ),
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;
