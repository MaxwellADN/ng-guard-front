import { IAddress } from "./address.interface";
import { ISubscription } from "./subscription.interface";

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
    biography?: string | null;
    position?: string | null;
    addresses?: IAddress[] | null;
    subscription?: ISubscription;
    createdBy: IUser | null;
}