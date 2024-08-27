import { z } from "zod";

export const CalvesRatioSchema = z.object({
    total_calves: z.number(),
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

export const HealthHistorySchema = z.object({
    total_cows: z.number(),
    total_diseases: z.record(z.string(), z.number().nonnegative()),
    recovery_counts: z.record(z.string(), z.number().nonnegative()),
    disease_per_cattle: z.record(
      z.string(),
      z.array(
        z.object({
          date: z.string(),
          status: z.enum(["Recovered", "Not Recovered"]),
          disease: z.string(),
        })
      )
    ),
    recovery_rate: z.record(z.string(), z.number().min(0).max(100)),
  });
  

export type CalvesRatioType = z.infer<typeof CalvesRatioSchema>
export type CalvesTimeType = z.infer<typeof CalvesTimeSchema>

export type VaccinesCoverageType = z.infer<typeof VaccinesCoverageSchema>

export type HealthHistoryType = z.infer<typeof HealthHistorySchema>