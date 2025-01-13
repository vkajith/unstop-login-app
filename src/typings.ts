export type LoginFormData = {
  username: string;
  password: string;
  email?: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};
