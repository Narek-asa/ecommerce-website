/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import dayjs from 'dayjs';
import './ChatInput.css';

export function ChatInput({
    chatMessages,
    setChatMessages,
    isLoading,
    setIsLoading,
}) {
    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function enterKeyPressed(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText('');
        }
    }

    async function sendMessage() {
        if (isLoading || !inputText.trim()) {
            return;
        }

        setInputText('');

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf(),
            },
        ];

        setIsLoading(true);

        setChatMessages([
            ...newChatMessages,
            {
                message: (
                    <img src={LoadingSpinner} className="loading-spinner" />
                ),
                sender: 'robot',
                id: crypto.randomUUID(),
            },
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf(),
            },
        ]);
        setIsLoading(false);
    }

    function clearMessages() {
        setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={enterKeyPressed}
                value={inputText}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">
                Send
            </button>
            <button onClick={clearMessages} className="clear-button">
                Clear
            </button>
        </div>
    );
} // ChatInput End
