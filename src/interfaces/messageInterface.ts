export interface IMessage{
    id?: string;

    text: string;

    attachments: null | string[];

    sender_id: string;

    recipient_id: string;
}

export interface IMessageUpdate {
    id?: string;

    text?: string;

    attachments?: null | string[];
}
export interface INewMessage  {
    text: string;

    attachments: null | string[];
}
