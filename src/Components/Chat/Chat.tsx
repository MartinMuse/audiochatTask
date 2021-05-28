import React, {FC, useState} from 'react';
import {IMessage, IMessagesState, sentMessageAction} from "../../Redux/Reducers/messagesReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../Redux/store";
import './Chat.css'
import {Message} from "./Message";

interface IChat {
    currentUserRole?: string
}

const Chat: FC<IChat> = ({currentUserRole}) => {
        const [value, setValue] = useState('')
        const dispatch = useDispatch()
        const {messages} = useSelector((state: rootState) => state.messages)

        const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log('wwww')
            const time = new Date()
            dispatch(sentMessageAction(value, `${time.getHours()} ${time.getMinutes()}`))
            setValue('')
        }

        const messagesElements = messages.map((el) => <Message key={el.time} title={el.title} time={el.time}/>)

        return (
            <div className="chatContainer">
                <div className={"messages-container"}>
                    {messagesElements}
                </div>
                {currentUserRole === 'speaker' && <form className={"chatContainer-form"} onSubmit={(e) => submitHandler(e)}>
                  <input type={"text"} value={value} onChange={(e) => setValue(e.target.value)}
                         placeholder={'Type a message...'}/>
                </form>}
            </div>
        );
    }
;

export default Chat;
