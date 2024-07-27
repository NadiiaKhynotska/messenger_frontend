import {IMessage, IMessageUpdate, INewMessage, IPagination} from '../interfaces';
import {apiService, IRes} from "./apiService";
import {urls} from "../constants";

const messageService = {
    postMessage: (recipient_id: string, message: INewMessage) => apiService.post(urls.message.postMessage(recipient_id), message),
    getAllMessages: (limit: number, offset: number, recipientId:string): IRes<IPagination<IMessage>> => apiService.get(urls.message.getAllMessages, {
        params: {
            limit,
            offset,
            recipientId
        }
    }),
    updateMessage: (message_id: string, messageUpdate: IMessageUpdate) => apiService.put(urls.message.updateMessage(message_id), messageUpdate),
    deleteMessage: (message_id: string) => apiService.delete(urls.message.deleteMessage(message_id))
}

export {messageService}
