import { ExhibitI } from "./ExhibitI";

export interface HomePropsI {
    fetchExhibits: (page: number, limit: number) => Promise<ExhibitI[] | any>;
  }