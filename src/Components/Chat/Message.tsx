import React, {FC} from "react";

interface IMessage {
    title: string,
    time: string
}

export const Message: FC<IMessage> = ({title, time}) => {
    return (
        <div className={'message-item'}>
            <div className={'title'}>{`${title}`}</div>
            <div className={'time'}>{`${time}`}</div>
        </div>
    )
}
