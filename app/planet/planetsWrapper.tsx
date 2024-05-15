import { getPlanets } from "./api";
import { PlanetsTable } from "./planetsTable";

export async function PlanetsWrapper() {
  let { results } = await getPlanets();

  return <PlanetsTable planets={results} />;
}
