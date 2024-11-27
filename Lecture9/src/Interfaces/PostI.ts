import { ExhibitI } from "./ExhibitI";

export interface PostPropsI {
    exhibit: ExhibitI;
    loadExhibits: () => void;
  }
