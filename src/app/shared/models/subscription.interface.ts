import { IPrice } from "./price.interface";
import { IUser } from "./user.interface";

export interface ISubscription {
    id?: string;
	createdAt: Date;
	updatedAt?: Date;
	stripeSubscriptionId?: string;
	stripeCustomerId?: string;
	stripeCheckoutSessionId?: string;
	stripeSubscriptionPortalUrl?: string;
	paypalAgreementId?: string;
	currentPeriodStart?: Date;
	currentPeriodEnd?: Date;
	canceledAt?: string;
	status: string;
	price: IPrice;
	createdBy: IUser;
}
