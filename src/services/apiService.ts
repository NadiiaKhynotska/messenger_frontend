import axios, {AxiosResponse} from "axios";

import { baseURL} from "../constants";

type IRes<DATA> = Promise<AxiosResponse<DATA>>


const apiService = axios.create({baseURL})
// apiService.interceptors.request.use(req => {
//     req.headers.Authorization = `Bearer ${access}`
//
//     return req
// })

export type{ IRes }
export {
    apiService
}
