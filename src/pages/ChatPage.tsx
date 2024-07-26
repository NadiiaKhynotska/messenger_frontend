import React from 'react';
import { useLocation } from 'react-router-dom';
import {ChatComponent} from "../components/chat/ChatComponent";


const ChatPage: React.FC = () => {
    const location = useLocation();
    const { user, recipientId } = location.state;

    return (
        <div>
            <ChatComponent user={user} recipientId={recipientId} />
        </div>
    );
};

export { ChatPage };
