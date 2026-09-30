export interface SelectionScreenMenu {
  shipName: string;
  countryKey: string;
  countries: Country[];
  currency: string;
}

export interface Country {
  key: string;
  text: string;
}
