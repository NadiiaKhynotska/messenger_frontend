import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IMessage } from '../../interfaces';
import { useAppDispatch } from '../../hooks';
import { messageActions } from '../../redux/slices/messageSlice';

interface MessageItemProps {
    message: IMessage;
    userId: string;
}

const MessageComponent: React.FC<MessageItemProps> = ({ message, userId }) => {
    const dispatch = useAppDispatch();

    const handleEditMessage = () => {
        dispatch(messageActions.setMessageForUpdate({ message: { id: message.id, text: message.text, attachments: [] } }));
    };

    const handleDeleteMessage = () => {
        dispatch(messageActions.deleteMessage({ message_id: message.id, limit: 10, offset: 0 }));
    };

    return (
        <Box sx={{ marginBottom: '10px' }}>
            <Typography variant="body2" color="text.secondary">
                {message.sender_id === userId ? 'User' : 'Me'}: {message.text}
            </Typography>
            <IconButton onClick={handleEditMessage}>
                <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleDeleteMessage}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export {MessageComponent};
