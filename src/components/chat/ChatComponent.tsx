import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { IUser, INewMessage, IMessageUpdate } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { messageActions } from '../../redux/slices';
import { AllMessageComponent } from "../messages/AllMessagesComponent";

interface IProps {
    user: IUser;
    recipientId: string;
}

const ChatComponent: React.FC<IProps> = ({ user, recipientId }) => {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();
    const { messages, messageForUpdate } = useAppSelector((state) => state.message);

    const limit = 10;
    const offset = 0;

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
            newSocket.emit('register', user.id);
        });

        newSocket.on('newMessage', () => {
            dispatch(messageActions.getAllMessages({ limit, offset, recipientId }));
        });

        newSocket.on('updateMessage', () => {
            dispatch(messageActions.getAllMessages({ limit, offset , recipientId}));
        });

        newSocket.on('deleteMessage', () => {
            dispatch(messageActions.getAllMessages({ limit, offset, recipientId }));
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user.id, dispatch, limit, offset,recipientId]);

    useEffect(() => {
        dispatch(messageActions.getAllMessages({ limit, offset , recipientId}));
    }, [dispatch, recipientId]);

    useEffect(() => {
        if (messageForUpdate) {
            setMessage(messageForUpdate.text);
        }
    }, [messageForUpdate]);

    useEffect(() => {
        console.log('Messages in component:', messages);  // Log the messages
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            if (messageForUpdate) {
                const messageUpdate: IMessageUpdate = {
                    // id: messageForUpdate.id,
                    text: message,
                    attachments: []
                };
                dispatch(messageActions.updateMessage({
                    message_id: messageForUpdate.id,
                    messageUpdate,
                    limit,
                    offset
                }));
                dispatch(messageActions.setMessageForUpdate({ message: null }));
            } else {
                const newMessage: INewMessage = {
                    attachments: [],
                    text: message,
                };
                dispatch(messageActions.postMessage({ recipient_id: recipientId, message: newMessage, limit, offset }));
            }

            setMessage('');
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Chat with {user.name}
                </Typography>
                <AllMessageComponent messages={messages?.data} userId={user.id} />
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
                    {messageForUpdate ? 'Update' : 'Send'}
                </Button>
            </CardContent>
        </Card>
    );
};

export { ChatComponent };

