export type VehicleCardsProps = {
  admin?: boolean;
};

export type SearchProps = {
  onSearchSubmit: (value: string) => void;
};

export type Filter = { min: number; max: number };

export type FilterProps = {
  onFilterChange: (filter: Filter) => void;
};
