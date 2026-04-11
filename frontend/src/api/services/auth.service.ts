import apiClient from "../client";

type AuthType = "signup" | "signin";

interface AuthPayload {
    email: string;
    password: string;
    name?: string;
}

interface AuthResponse {
    jwt: string;
}

export const authenticate = async (type: AuthType, payload: AuthPayload) => {
    const { data } = await apiClient.post<AuthResponse>(`/api/v1/user/${type}`, payload);
    return data;
};
