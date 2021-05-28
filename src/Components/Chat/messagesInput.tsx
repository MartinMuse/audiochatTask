import React, {FC, useEffect, useState} from 'react';
import {IMessage, IMessagesState, sentMessageAction} from "../../Redux/Reducers/messagesReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../Redux/store";
import './Chat.css'
import {Message} from "./Message";

export const ChatInput: FC = () => {
        const [value, setValue] = useState('')
        const dispatch = useDispatch()

        const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const time = new Date()
            dispatch(sentMessageAction(value, `${time.getHours()} ${time.getMinutes()}`,Date.now()))
            setValue('')
        }

        return (
          <form className={"chatContainer-form"} onSubmit={(e) => submitHandler(e)}>
                <input type={"text"} value={value} onChange={(e) => setValue(e.target.value)}
                       placeholder={'Type a message...'}/>
            </form>
        );
    }
;
