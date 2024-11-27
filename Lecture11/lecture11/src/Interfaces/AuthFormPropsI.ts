import { LoginI } from "./LoginI";

export interface AuthFormPropsI {
    title: string;
    buttonText: string;
    onSubmit: (values: LoginI) => void;
    loading: boolean;
    error: string | null;
    redirectLink: { text: string; href: string };
  }