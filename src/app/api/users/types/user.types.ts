export interface User {
  id: number;
  email: string;
  username: string;
  role: 'user' | 'admin'
  createdAt: string;
  updeatedAt: string;
  city?: string;
};

export interface UserPreferences {
  theme: 'light' | 'dark';
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  preferences?: Partial<UserPreferences>
}