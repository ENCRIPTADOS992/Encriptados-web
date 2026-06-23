export type SimServiceOptionDefinition = {
  value: string;
  translationKey: string;
};

// Orden canónico solicitado para selectores de servicios SIM.
// Cada pantalla usa el subconjunto que realmente soporta.
export const SIM_SERVICE_OPTION_ORDER: readonly SimServiceOptionDefinition[] = [
  { value: "all", translationKey: "allOption" },
  { value: "datarecharge", translationKey: "services.rechargeData" },
  { value: "minuterecharge", translationKey: "services.rechargeMinutes" },
  { value: "esim", translationKey: "services.esim" },
  { value: "eSimData", translationKey: "services.esimData" },
  { value: "eSimMinutes", translationKey: "services.esimMinutes" },
  { value: "physicsim", translationKey: "services.physicalSim" },
] as const;

export const TIM_SERVICE_OPTION_ORDER: readonly SimServiceOptionDefinition[] = [
  { value: "all", translationKey: "allOption" },
  { value: "datarechargetim", translationKey: "services.rechargeData" },
  { value: "esimplusdatatim", translationKey: "services.esimData" },
  { value: "physicsimtim", translationKey: "services.physicalSim" },
] as const;
