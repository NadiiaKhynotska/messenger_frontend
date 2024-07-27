// import React, { useEffect, useState } from 'react';
// import { Box, Button, Card, CardContent, TextField, Typography, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { io, Socket } from 'socket.io-client';
// import { IUser, IMessage, INewMessage, IMessageUpdate } from '../../interfaces';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { messageActions } from '../../redux/slices/messageSlice';
//
// interface IProps {
//     user: IUser;
//     recipientId: string;
// }
//
// const ChatComponent: React.FC<IProps> = ({ user, recipientId }) => {
//     const [message, setMessage] = useState('');
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const dispatch = useAppDispatch();
//     const { messages, messageForUpdate } = useAppSelector((state) => state.message);
//
//     const limit = 10;
//     const offset = 0;
//
//     useEffect(() => {
//         const newSocket = io('http://localhost:3001');
//         setSocket(newSocket);
//
//         newSocket.on('connect', () => {
//             console.log('Connected to WebSocket server');
//             newSocket.emit('register', user.id);
//         });
//
//         newSocket.on('newMessage', (data: IMessage) => {
//            newSocket.emit('newMessage', data)
//         });
//
//         newSocket.on('updateMessage', (data: IMessage) => {
//             dispatch(messageActions.getAllMessages({ limit, offset , recipientId}));
//         });
//
//         newSocket.on('deleteMessage', (data: string) => {
//             dispatch(messageActions.getAllMessages({ limit, offset, recipientId }));
//         });
//
//         return () => {
//             newSocket.disconnect();
//         };
//     }, [user.id, dispatch, limit, offset]);
//
//     useEffect(() => {
//         dispatch(messageActions.getAllMessages({ limit, offset ,recipientId}));
//     }, [dispatch]);
//
//     useEffect(() => {
//         if (messageForUpdate) {
//             setMessage(messageForUpdate.text);
//         }
//     }, [messageForUpdate]);
//
//     useEffect(() => {
//         console.log('Messages in component:', messages);  // Log the messages
//     }, [messages]);
//
//     const handleSendMessage = () => {
//         if (message.trim()) {
//             const newMessage: INewMessage = {
//                 attachments: [],
//                 text: message,
//             };
//
//             if (messageForUpdate) {
//                 const messageUpdate: IMessageUpdate = {
//                     id: messageForUpdate.id,
//                     text: message,
//                     attachments: []
//                 };
//                 dispatch(messageActions.updateMessage({ message_id: messageForUpdate.id, messageUpdate, limit, offset }));
//                 dispatch(messageActions.setMessageForUpdate({ message: null }));
//             } else {
//                 dispatch(messageActions.postMessage({ recipient_id: recipientId, message: newMessage, limit, offset }));
//             }
//
//             setMessage('');
//         }
//     };
//
//     const handleEditMessage = (msg: IMessage) => {
//         dispatch(messageActions.setMessageForUpdate({ message: { id: msg.id, text: msg.text, attachments: [] } }));
//     };
//
//     const handleDeleteMessage = (msgId: string) => {
//         dispatch(messageActions.deleteMessage({ message_id: msgId, limit, offset }));
//     };
//
//     return (
//         <Card>
//             <CardContent>
//                 <Typography variant="h5" component="div">
//                     Chat with {user.name}
//                 </Typography>
//                 <Box sx={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '20px' }}>
//                     {messages && messages.data.map((msg, index) => (
//                         <Box key={index} sx={{ marginBottom: '10px' }}>
//                             <Typography variant="body2" color="text.secondary">
//                                 {msg.sender_id === user.id ? 'Me' : 'User'}: {msg.text}
//                             </Typography>
//                             <IconButton onClick={() => handleEditMessage(msg)}>
//                                 <EditIcon fontSize="small" />
//                             </IconButton>
//                             <IconButton onClick={() => handleDeleteMessage(msg.id)}>
//                                 <DeleteIcon fontSize="small" />
//                             </IconButton>
//                         </Box>
//                     ))}
//                 </Box>
//                 <TextField
//                     fullWidth
//                     label="Message"
//                     variant="outlined"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                             handleSendMessage();
//                         }
//                     }}
//                     sx={{ marginTop: '20px' }}
//                 />
//                 <Button size="small" color="primary" onClick={handleSendMessage} sx={{ marginTop: '10px' }}>
//                     {messageForUpdate ? 'Update' : 'Send'}
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// };
//
// export { ChatComponent };

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { IUser, INewMessage, IMessageUpdate } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { messageActions } from '../../redux/slices/messageSlice';
import {AllMessageComponent} from "../messages/AllMessagesComponent";

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
    const offset = 5;

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
            const newMessage: INewMessage = {
                attachments: [],
                text: message,
            };

            if (messageForUpdate) {
                const messageUpdate: IMessageUpdate = {
                    id: messageForUpdate.id,
                    text: message,
                    attachments: []
                };
                dispatch(messageActions.updateMessage({ message_id: messageForUpdate.id, messageUpdate, limit, offset }));
                dispatch(messageActions.setMessageForUpdate({ message: null }));
            } else {
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

