import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {rootState} from "../../Redux/store";
import './Chat.css'
import {ChatInput} from "./messagesInput";
import MessagesContainer from "./MessagesContainer";

interface IChat {
    currentUserRole?: string
}

export const Chat: FC<IChat> = ({currentUserRole}) => {
    const {messages} = useSelector((state: rootState) => state.messages)
    return (
        <div className="chatContainer">
            <MessagesContainer messages={messages}/>
            <ChatInput/>
        </div>
    );
}
