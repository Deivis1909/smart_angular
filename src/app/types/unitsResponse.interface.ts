import { Location } from "./Location.interface";

// interface unidade de resposta
export interface UnitsResponse {
  current_country_id: number,
  locations: Location[]
}
