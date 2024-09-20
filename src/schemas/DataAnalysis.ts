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

export const CalvesPredictSchema = z.array(
  z.object({
    number: z.string(),
    data: z.object({
      mother_number: z.number(),
      start_date: z.string().optional(),
      future_date: z.string().optional(),
      predicted_weight: z.number().optional()
    })
  }),
)

export const VaccinesCoverageSchema = z.object({
  total_cows: z.number(),
  vaccine_coverage: z.record(z.string(), z.number())
})

export const VaccinesQuarterlySchema = z.object({
  vaccination_data: z.array(
    z.object({
      quadrimester: z.string(),
      total_vaccines: z.number(),
      vaccine_types: z.object({
        Virose: z.number(),
        Brucelose: z.number(),
        "Leucose Bovina": z.number(),
        "Pneumonia Bovina": z.number()
      })
    })
  ),
  vaccine_types: z.array(z.string())
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

export const WeightVariationSchema = z.array(
  z.object({
    average_weight: z.number(),
    month: z.number(),
    year: z.number(),
    precipitation: z.number()
  })
)

export const WeightVariationMonthSchema = z.array(
  z.object({
    average_weight: z.number(),
    month: z.number(),
  })
)

export const FinancialByCowSchema = z.array(
  z.object({
    id: z.number(),
    total_spent: z.number(),
    total_received: z.number(),
    profit: z.number(),
    percentage_spent_by_category: z.array(
      z.object({ category: z.string(), percentual: z.number() })
    ),
    percentage_gains_by_category: z.array(
      z.object({ category: z.string(), percentual: z.number() })
    ),
  })
)

export const FinancialCurrentSchema = z.object({
  month: z.string(),
  year: z.number(),
  monthly: z.object({
    total_spent: z.number(),
    total_received: z.number(),
    spent_change: z.number(),
    received_change: z.number()
  }),
  yearly: z.object({
    total_spent: z.number(),
    total_received: z.number()
  })
})

export const FinancialPredictionSchema = z.object({
  month_name: z.string(),
  entry_prediction: z.number(),
  exit_prediction: z.number(),
  entry_variation_percent: z.number(),
  exit_variation_percent: z.number()
})

export const LocationDataSchema = z.object({
  locations: z.array(z.object({
    cowId: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string()
  })),
  top_zones: z.array(z.object({
    total_count: z.number(),
    latitude_range: z.string(),
    longitude_range: z.string()
  })),
  out_of_bounds_cows: z.array(z.object({
    cowId: z.number()
  }))
})

export type CalvesRatioType = z.infer<typeof CalvesRatioSchema>
export type CalvesTimeType = z.infer<typeof CalvesTimeSchema>
export type CalvesPredictType = z.infer<typeof CalvesPredictSchema>

export type VaccinesCoverageType = z.infer<typeof VaccinesCoverageSchema>
export type VaccinesQuarterlyType = z.infer<typeof VaccinesQuarterlySchema>

export type HealthHistoryType = z.infer<typeof HealthHistorySchema>

export type WeightVariationType = z.infer<typeof WeightVariationSchema>
export type WeightVariationMonthType = z.infer<typeof WeightVariationMonthSchema>

export type FinancialByCowType = z.infer<typeof FinancialByCowSchema>
export type FinancialCurrentType = z.infer<typeof FinancialCurrentSchema>
export type FinancialPredictType = z.infer<typeof FinancialPredictionSchema>
export type LocationDataType = z.infer<typeof LocationDataSchema>