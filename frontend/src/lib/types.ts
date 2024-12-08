import { LucideIcon } from "lucide-react";

export interface LoginUserResponse {
  id: number;
  user_type: "T" | "S";
  email: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface StudentCreds {
  id: number;
  fn: string;
  ln: string;
  middle_name: string | null;
  ext_name: string | null;
  gender: "M" | "F" | "Others" | null;
  birthday: string | null;
  place_of_birth: string | null;
  civil_status: "single" | "married" | "widowed" | null;
  nationality: string | null;
  religion: string | null;
  contact_number: string | null;
  height: number | null;
  weight: number | null;
  blood_type: string | null;
  address: string | null;
  province: string | null;
  city: string | null;
  barangay: string | null;
  zip_code: number | null;
  profile_picture: string | null;
  section_id: number | null;
  activities: number[];
  grades: { subject_id: number; grade: number } | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TeacherCreds {
  id: number;
  fn: string;
  ln: string;
  subjects: number[];
  gender: "M" | "F" | "Others" | null;
  birthday: string | null;
  isAdmin: boolean;
  profile_picture: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface q_and_a {
  q: string;
  a: string;
  choices: [string, string, string, string];
  points: number;
}

export interface Task {
  task_name: string;
  tests: q_and_a[][];
  type: string;
  total_score: number;
  subject_id: number;
  deadline: string | null;
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
  user_creds: StudentCreds | TeacherCreds;
  token: LoginTokenResponse;
}

export interface UsersType {
  user: LoginUserResponse;
  user_creds: StudentCreds | TeacherCreds;
}

export interface AppContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UsersType | null;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
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

export type CourseType = {
  id: number;
  course_code: string;
  course_name: string;
  created_at: string;
  updated_at: string;
};

export type SubjectType = {
  id: number;
  subject_code: string;
  subject_name: string;
  section_id: number | null;
  teacher_id: number | null;
  classroom_uploads: number[];
  type: "core" | "minor";
  created_at: string;
  updated_at: string;
};

export type GradeType = {
  id: number;
  student_id: number;
  subject_code: string;
  grade: number;
};

export type SectionType = {
  id: number;
  year: number;
  name: string;
  course_id: number;
  students: number[];
  subjects: number[];
  created_at: string;
  updated_at: string;
};

export type AuditLogType = {
  message: string;
  user_type: "A" | "S" | "T";
};

export type ActivityUploadType = {
  id: number;
  title: string;
  description: string | null;
  attachments: string[];
  total_score: number;
  deadline_id: number;
  created_at: string;
  updated_at: string;
};

export type ActivityDeadlineType = {
  id: number;
  activity_upload_id: number;
  deadline: string;
  created_at: string;
  updated_at: string;
};

export type ActivitySubmissionType = {
  id: number;
  student_id: number;
  activity_upload_id: number;
  attachments: string[];
  description: string | null;
  score: number | null;
  submitted: boolean;
  created_at: string;
  updated_at: string;
};

export type ValidIdType = {
  id: number;
  user_type: "S" | "T";
  created_at: string;
  updated_at: string;
};
