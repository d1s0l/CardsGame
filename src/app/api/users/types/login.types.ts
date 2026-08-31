import type { User } from "./user.types";

export interface LoginRequest {
    email: string;
    password: string;
};

export interface LoginResponse {
    user: User
    token: string;
    refreshToken: string;
    expirsIn: number;
}
