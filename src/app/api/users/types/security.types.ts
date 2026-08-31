export interface ChangePasswordRequest {
    currentPassowrd: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword?: string
}