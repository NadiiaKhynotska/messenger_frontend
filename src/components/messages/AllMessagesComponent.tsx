import React from 'react';
import { Box } from '@mui/material';
import { IMessage } from '../../interfaces';
import {MessageComponent} from "./MessageComponent";

interface MessagesListProps {
    messages: IMessage[];
    userId: string;
}

const AllMessageComponent: React.FC<MessagesListProps> = ({ messages, userId }) => {
    return (
        <Box sx={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '20px' }}>
            {messages?.map((msg) => (
                <MessageComponent key={msg.id} message={msg} userId={userId} />
            ))}
        </Box>
    );
};

export {AllMessageComponent};
