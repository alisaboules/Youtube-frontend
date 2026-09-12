export interface TAuthFormData {
  email: string;
  password: string;
}

export interface TAuthForm extends TAuthFormData{
  confirmPassword?: string
}