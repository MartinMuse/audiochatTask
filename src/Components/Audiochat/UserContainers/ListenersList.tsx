import React, {FC} from "react";
import {IListener} from "../../../Redux/Reducers/listenersReducer";
import {Listener} from "../../Partisipants/Listener";

interface ListenersContainerProps {
    listeners: Array<IListener>,
}

const ListenersList: FC<ListenersContainerProps> = ({listeners}) => {
    const notRequestListeners = listeners.filter((el) => !el.actions.speakRequest)
    const listenersElements = notRequestListeners.map(el => <li key={el.data.id}>
        <Listener
            data={el.data}
            actions={el.actions}
        />
    </li>)
    return (
        <div className="usersBlock">
            <h1>Listeners</h1>
            <ul className="listeners-list">
                {listenersElements}
            </ul>
        </div>
    )
}

export default ListenersList
