import { IMessageUpdate, INewMessage} from '../interfaces';
import {apiService} from "./apiService";
import {urls} from "../constants";

const messageService = {
    postMessage : async (recipient_id: string, message: INewMessage) => {
        const response = await apiService.post(urls.message.postMessage(recipient_id), message);
        return response.data;
    },

    getAllMessages: async () => {
        const response = await apiService.get(urls.message.getAllMessages);
        return response.data;
    },

    updateMessage : async (message_id: string, messageUpdate: IMessageUpdate) => {
        const response = await apiService.patch(urls.message.updateMessage(message_id), messageUpdate);
        return response.data;
    },

     deleteMessage : async (message_id: string) => {
        const response = await apiService.delete(urls.message.deleteMessage(message_id));
        return response.data;
    }
}



export {messageService}
