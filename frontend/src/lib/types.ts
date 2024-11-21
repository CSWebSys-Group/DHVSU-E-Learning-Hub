import { LucideIcon } from "lucide-react";

export interface LoginUserResponse {
  id: number;
  user_type: "T" | "S";
  email: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}
export interface LoginUserCredsResponse {
  id: number;
  fn: string;
  ln: string;
  subjects: number[];
  gender: "M" | "F" | "Others";
  birthday: string;
  isAdmin: boolean;
  created_at: string | null;
  updated_at: string | null;
}
export interface LoginTokenResponse {
  accessToken: {
    name: string;
    abilities: string[];
    expires_at: string | null;
    tokenable_id: number;
    tokenable_type: string;
    updated_at: string | null;
    created_at: string | null;
    id: number;
  };
  plainTextToken: string;
}

export interface LoginResponse {
  user: LoginUserResponse;
  user_creds: LoginUserCredsResponse;
  token: LoginTokenResponse;
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: LucideIcon;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export type Subject = {
  id: number;
  subject_code: string;
  subject_name: string;
  profileImage: string | null;
};
