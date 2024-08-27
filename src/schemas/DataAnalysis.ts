import { z } from "zod";

export const CalvesRatioSchema = z.object({
    total_cows: z.number(),
    weaned_calves: z.number(),
    weaned_ratio: z.number()
})

export const CalvesTimeSchema = z.object({
    total_calves_weaned: z.number(),
    average_weaning_time: z.number(),
    min_weaning_time: z.number(),
    max_weaning_time: z.number()
})

export const VaccinesCoverageSchema = z.object({
    total_cows: z.number(),
    vaccine_coverage: z.record(z.string(), z.number())
})

export type CalvesRatioType = z.infer<typeof CalvesRatioSchema>
export type CalvesTimeType = z.infer<typeof CalvesTimeSchema>

export type VaccinesCoverageType = z.infer<typeof VaccinesCoverageSchema>