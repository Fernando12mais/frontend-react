import z from "zod";

export const searchSchema = z.object({
  search: z.string().default(""),
});

export type SearchSchema = z.infer<typeof searchSchema>;
