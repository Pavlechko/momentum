export type RegisterForm = {
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginUser = Omit<RegisterForm, 'confirmPassword'>;