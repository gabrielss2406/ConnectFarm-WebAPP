import { z } from "zod";

export const FarmSchema = z.object({
    name: z.string(),
    farm_id: z.string(),
    address: z.string()
})

export type FarmType = z.infer<typeof FarmSchema>