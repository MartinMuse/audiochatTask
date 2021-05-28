import React, {FC, useEffect, useState} from 'react';
import {IMessage, IMessagesState, sentMessageAction} from "../../Redux/Reducers/messagesReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../Redux/store";
import './Chat.css'
import {Message} from "./Message";
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
