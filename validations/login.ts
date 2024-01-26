import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .default("admin@email.com"),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres")
    .default("@admin"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
