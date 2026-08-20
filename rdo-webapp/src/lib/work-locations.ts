/** Tipos aceitos pela coluna location_type de rdo.work_locations.
 *
 *  Vive fora de app/actions/locations.ts porque um modulo "use server" so pode
 *  exportar funcoes assincronas; uma const exportada de la quebra o build.
 */
export const locationTypes = [
  { value: "front", label: "Frente de serviço" },
  { value: "area", label: "Área" },
  { value: "equipment", label: "Equipamento" },
  { value: "tag", label: "TAG" },
  { value: "other", label: "Outro" },
] as const;

export type LocationType = (typeof locationTypes)[number]["value"];
