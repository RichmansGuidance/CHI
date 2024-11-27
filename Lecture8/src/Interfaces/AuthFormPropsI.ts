export interface AuthFormPropsI {
    title: string;
    buttonText: string;
    onSubmit: () => void;
    loading: boolean;
    error: string | null;
    redirectLink: { text: string; href: string };
    formData: { username: string; password: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  