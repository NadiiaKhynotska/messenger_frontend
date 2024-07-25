import axios, {AxiosError, AxiosResponse} from "axios";

import {baseURL, urls} from "../constants";
import {authService} from "./authService";
import {router} from "../router";

type IRes<DATA> = Promise<AxiosResponse<DATA>>


const apiService = axios.create({baseURL})
apiService.interceptors.request.use(req => {
    const isRefreshRequest = req.url.includes('/auth/refresh')
    if (isRefreshRequest) {
        const refreshToken = authService.getRefreshToken();
        req.headers.Authorization = `Bearer ${refreshToken}`;
    } else {
        const accessToken = authService.getAccessToken();
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
})

let isRefresh = false;
const waitList:IWaitList[] = []
apiService.interceptors.response.use(
    res => {
        return res
    },
    async (error: AxiosError) => {
        const originalRequest = error.config

        if (error.response.status === 401) {
            if (!isRefresh) {
                isRefresh = true
                try {
                    await authService.refresh()
                    isRefresh = false
                    afterRefresh()
                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefresh = false
                    router.navigate('/login?SessionExpired=true')
                    return Promise.reject(error)
                }
            }
            if(originalRequest.url === urls.auth.refresh){
                return Promise.reject(error)
            }
            return new Promise(resolve => {
                subscribeToWaitList(()=>resolve(apiService(originalRequest)))
            })
        }
        return Promise.reject(error)
    }
)

type IWaitList = () => void
const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb)
}

const afterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb()
    }
}

export type{ IRes }

export {
    apiService
}
