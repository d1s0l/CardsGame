export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
};

export interface UserPreferences {
  theme: 'light' | 'dark';
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  preferences?: Partial<UserPreferences>
}