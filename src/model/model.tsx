export interface CountryModel {
  value: string;
  label: string;
  language: string;
}

export interface ExistEmailModel {
  exist: boolean;
}

export interface RegisterData {
  username: string;
  salt: string;
  verifier: string;
  country: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  jwt: string;
  refresh_token: string;
  expiration_date: string;
}

export interface Characters {
  characters: Character[];
  total_quantity: number;
}

export interface Character {
  id: 1;
  name: String;
  race: String;
  gender: String;
  class: String;
  level: number;
  xp: number;
  money: number;
  flags: String;
  note: String;
  race_id: number;
  class_id: number;
}

export interface AccountDetail {
  username: string;
  country: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  date_of_birth: Date;
  account_banned: AccountBannedModel;
  account_muted: AccountMutedModel;
}

export interface AccountBannedModel {
  active: boolean;
  reason: string;
  ban_date: string;
  banned_by: string;
  unban_date: string;
}

export interface AccountMutedModel {
  mute_date: string;
  mute_time: string;
  muted_by: string;
  reason: string;
}

export interface Friends {
  friends: Character[];
  total_quantity: number;
}
