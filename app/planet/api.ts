import { OriginalPlanet, PlanetsResponse } from "./types";

export const API_URL = "https://swapi.dev/api/";
export const API_TIMEOUT = 15000;

const makeFetch = (resource: string): Promise<Response> => {
  return fetch(`${API_URL}/${resource}`, {
    signal: AbortSignal.timeout(API_TIMEOUT),
  });
};

export async function getPlanets(): Promise<PlanetsResponse> {
  try {
    const resource = `/planets?page=1`;
    const response = await makeFetch(resource);

    if (!response.ok) {
      throw new Error("Failed to pull planets, they're too heavy!");
    }

    const data = await response.json();
    data.results = data.results.map((planet: OriginalPlanet) => {
      const alternatives = planet.terrain.split(", ");
      const [active] = alternatives;

      return {
        ...planet,
        terrain: {
          active,
          alternatives,
        },
      };
    });

    console.log(data);

    return data;
  } catch (error) {
    throw new Error("Failed to parse response!", {
      cause: error,
    });
  }
}
