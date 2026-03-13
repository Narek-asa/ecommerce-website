/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import './ChatMessages.css';

export function ChatMessages({ chatMessages }) {
    function useAutoScroll(dependencies) {
        const containerRef = useRef(null);

        useEffect(() => {
            const containerElem = containerRef.current;
            if (containerElem) {
                containerElem.scrollTop = containerElem.scrollHeight;
            }
        }, dependencies);

        return containerRef;
    }

    const chatMessagesRef = useAutoScroll(chatMessages);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages, chatMessagesRef]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        time={chatMessage.time}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

export default ChatMessages;
