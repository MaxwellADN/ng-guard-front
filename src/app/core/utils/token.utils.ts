import { JwtHelperService } from "@auth0/angular-jwt";
import { IUser } from "../../shared/models/user.interface";

export class TokenUtils {
    /**
     * Decodes a JWT token and returns the payload.
     * @param token The JWT token to decode.
     * @returns The decoded payload of the token.
     */
    public static decodeToken(token: string): IUser {
        const tokenHelper = new JwtHelperService();
        if (tokenHelper.isTokenExpired(token)) {
            throw new Error("Token is expired");    
        }
        return tokenHelper.decodeToken(token)!;
    }
}