import { ExhibitI } from "./ExhibitI";

export interface BlogPropsI {
    initialExhibits: ExhibitI[];
    limit: number;
    page: number;
    lastPage: number;
    showToaster?: boolean;
  }