import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import {IUser, IMessage, INewMessage} from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { messageActions } from '../../redux/slices/messageSlice';

interface IProps {
    user: IUser;
    recipientId: string;
}

const ChatComponent: React.FC<IProps> = ({ user, recipientId }) => {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();
    const { messages } = useAppSelector((state) => state.message);
    console.log(messages)

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            newSocket.emit('register', user.id);
        });

        newSocket.on('newMessage', (data: IMessage) => {
            dispatch({ type: 'messageSlice/postMessage/fulfilled', payload: data });
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user.id, dispatch]);

    useEffect(() => {
        dispatch(messageActions.getAllMessages());
    }, [dispatch, message]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: INewMessage = {
                attachments: [],
                text: message,
            };

            dispatch(messageActions.postMessage({ recipient_id: recipientId, message: newMessage }));
            setMessage('');
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Chat with {user.name}
                </Typography>
                <Box sx={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '20px' }}>
                    {messages && messages.map((msg, index) => (
                        <Box key={index} sx={{ marginBottom: '10px' }}>
                            <Typography variant="body2" color="text.secondary">
                                {msg.sender_id === user.id ? 'Me' : 'User'}: {msg.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    sx={{ marginTop: '20px' }}
                />
                <Button size="small" color="primary" onClick={handleSendMessage} sx={{ marginTop: '10px' }}>
                    Send
                </Button>
            </CardContent>
        </Card>
    );
};

export { ChatComponent };
