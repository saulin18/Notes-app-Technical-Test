export interface Token {
    access: string;
    refresh: string;
    exp: number;
}

export interface User {
    id: number;
    username: string;
    password: string;
    is_admin: boolean;
    is_active: boolean;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    owner: number;
    solutions: QuizSolution[];
    winner_solution: number;
}

export interface QuizSolution {
    id: number;
    quiz_id: number;
    user_id: number;
    content: string
    created_at: string;
}
