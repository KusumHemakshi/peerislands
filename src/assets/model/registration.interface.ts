export interface IField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: string[];
  validation?: {
    pattern: string;
    message: string;
  };
}

export interface IRegistration {
  title: string;
  fields: IField[];
}

export interface IKeyValue {
  key: boolean;
  value: string;
}

export interface IUserDetail {
  fullName: string;
  email: string;
  dob: Date;
  gender: string;
  hobbies: string[];
  subscribe: boolean;
  about: string;
}
