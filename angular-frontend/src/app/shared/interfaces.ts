// User interface
export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

export interface Tile {
  cols: number;
  rows: number;
}

export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length: Length;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface Us {
  amount: number;  
  unitLong: string;
  unitShort: string;
}

export interface Metric {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface WinePairing {
}