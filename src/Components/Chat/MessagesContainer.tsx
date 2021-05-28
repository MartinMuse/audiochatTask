import React, {FC} from "react";
import {IMessage} from "../../Redux/Reducers/messagesReducer";
import {Message} from "./Message";

interface IProps {
    messages: Array<IMessage>
}

const MessagesContainer: FC<IProps> = (props) => {
    const messagesElements = props.messages.map((el) => {
        return <Message key={el.id} title={el.title} time={el.time}/>
    })

    return <div className={"messages-container"}>
        {messagesElements}
    </div>
}

export default React.memo(MessagesContainer)
