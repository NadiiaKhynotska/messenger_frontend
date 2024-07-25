import {apiService, IRes} from "./apiService";
import {urls} from "../constants";
import {IAuth, ITokens, IUser} from "../interfaces";


const accessTokenKey = 'access';
const refreshTokenKey = 'refresh'

const authService = {
    register: (data:IAuth):IRes<IUser> => {
        return  apiService.post<IUser>(urls.auth.registration, data);
    },

    async login(user: IAuth): Promise<IUser> {
        const {data} = await apiService.post<{ tokens:ITokens, user:IUser }>(urls.auth.sign_in, user);
        this.setTokens(data.tokens)
        return data.user
    },

    async logout(): Promise<void> {
        await apiService.post<void>(urls.auth.logout);
        this.deleteTokens()
    },

    async refresh():Promise<void>{
        const {data} = await apiService.post<ITokens>(urls.auth.refresh);
        this.setTokens(data)
    },
    setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(accessTokenKey, accessToken)
        localStorage.setItem(refreshTokenKey, refreshToken)
    },

    getAccessToken(): string {
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken(): string {
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }
}

export {authService}
