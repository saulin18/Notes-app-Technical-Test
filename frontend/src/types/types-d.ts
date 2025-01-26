
export interface Note {
    uuid: string;
    id: number;
    title: string;
    content: string;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
    categories: number[];
    is_deleted: boolean;
}

export interface Category {
    uuid: string;
    id: number;
    name: string;
    is_deleted: boolean;
}

export interface User {
    username: string;
    password: string;
  }