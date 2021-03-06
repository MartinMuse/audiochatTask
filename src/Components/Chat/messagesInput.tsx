import React, {FC, useState} from 'react';
import {sentMessageAction} from "../../Redux/Reducers/messagesReducer";
import {useDispatch} from "react-redux";
import './Chat.css'

export const ChatInput: FC = () => {
        const [value, setValue] = useState('')
        const dispatch = useDispatch()

        const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const time = new Date()
            if (value.length!==0){
                dispatch(sentMessageAction(value, `${time.getHours()} ${time.getMinutes()}`, Date.now()))
                setValue('')
            }
        }
        return (
          <form className={"chatContainer-form"} onSubmit={(e) => submitHandler(e)}>
                <input type={"text"} value={value} onChange={(e) => setValue(e.target.value)}
                       placeholder={'Type a message...'}/>
            </form>
        );
    }
;
