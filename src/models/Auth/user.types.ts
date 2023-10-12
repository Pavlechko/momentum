export type RegisterForm = {
  name: string;
  password: string;
  confirmPassword: string;
};

export type UserRequest = Omit<RegisterForm, 'confirmPassword'>;