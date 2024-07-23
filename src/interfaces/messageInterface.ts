export interface IMessage{
    id: string;

    text: string;

    attachments: null | string[];

    sender_id: string;

    recipient_id: string;
}
