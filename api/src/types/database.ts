// types/database.ts
export interface Admin {
    id: number;
    email: string;
    name: string;
}

export interface AdminWithPassword extends Admin {
    password_hash: string;
}

// Type guard untuk memastikan object adalah Admin
export function isAdmin(obj: any): obj is Admin {
    return (
        obj &&
        typeof obj.id === 'number' &&
        typeof obj.email === 'string' &&
        typeof obj.name === 'string'
    );
}

// Type guard untuk AdminWithPassword
export function isAdminWithPassword(obj: any): obj is AdminWithPassword {
    return (
        isAdmin(obj) &&
        typeof (obj as any).password_hash === 'string'
    );
}

// Tipe untuk hasil query SELECT tanpa password
export type AdminResult = Pick<Admin, 'id' | 'email' | 'name'>;

// Tipe untuk hasil query SELECT dengan password
export type AdminWithPasswordResult = AdminWithPassword;

// Tipe untuk insert admin (input)
export type AdminInsert = Omit<AdminWithPassword, 'id'>;

// Tipe untuk update admin
export type AdminUpdate = Partial<Omit<AdminWithPassword, 'id'>>;