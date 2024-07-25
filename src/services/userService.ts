import {apiService, IRes} from "./apiService";
import {IPagination, IUser} from "../interfaces";
import {urls} from "../constants";

const userService = {

   findMe:(): IRes<IUser> =>{
        return  apiService.get(urls.users.findMe)
    },
    getAll:( limit: number, offset:number):IRes<IPagination<IUser>> => apiService.get(urls.users.getAll, {params:{limit, offset}}),
    deleteMe: (userId: string):Promise<void>=> apiService.delete(urls.users.deleteMe(userId))
}
export { userService}
