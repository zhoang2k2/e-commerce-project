export interface AccountType {
  id?: string;
  fullname: string;
  gender: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: string;
  authenticated?: boolean;
}

export interface AccountAuth {
  id?: string;
  email: string;
  password: string;
}

export interface AccountState {
  accounts: AccountType[];
  status: string;
}
