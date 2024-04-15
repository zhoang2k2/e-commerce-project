export interface AccountType {
  id?: string
  fullname: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: string;
}

export interface AccountState {
  accounts: AccountType[];
  status: string;
}
