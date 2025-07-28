import { IUser } from "./user.interface";

export interface IPrice {
    _id: string;
    title: string;
    homeUrl: string;
    price: number; 
    currency: string;
    recurring: { interval: "day" | "week" | "month" | "year" };
    cannotDelete: boolean;
    recommended: boolean;
    stripePriceId?: string; 
    paypalPriceId?: string;
    subscribed?: boolean;
    active: boolean;
    createdBy: IUser;
}