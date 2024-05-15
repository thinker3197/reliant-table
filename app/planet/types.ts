export type EditableField<T> = {
  active: T;
  alternatives: T[];
  previous?: T,
  lastEdited?: number;
};

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: EditableField<string>;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export interface OriginalPlanet extends Omit<Planet, "terrain"> {
  terrain: string;
}

export type PlanetsResponse = {
  count: number;
  next: string;
  prev: string;
  results: Planet[];
};
