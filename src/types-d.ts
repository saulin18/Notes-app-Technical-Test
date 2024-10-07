export interface Token {
    access: string;
    refresh: string;
    exp: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    is_admin: boolean;
}