import { IAddress } from "./address.interface";

export interface IUser {
    id: string | null;
    email: string;
    password?: string;
    fullname: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    agreeWithTerms: boolean;
    emailVerified: boolean;
    rememberMe: boolean | null;
    role: number | null;
    language: string;
    addresses?: IAddress[];
    createdBy: IUser | null;
    biography?: string;
    position?: string;
    country?: string;
}