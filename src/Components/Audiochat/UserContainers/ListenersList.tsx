import {ISpeaker} from "../../../Redux/Reducers/speakersReducer";
import Speaker from "../../Partisipants/Speaker";
import React, {FC} from "react";
import {RequestButton} from "../../Partisipants/RequestButton";
import {IListener, setSpeakRequestAction} from "../../../Redux/Reducers/listenersReducer";
import {useDispatch} from "react-redux";
import {Listener} from "../../Partisipants/Listener";

interface SpeakersContainerProps {
    listeners: Array<IListener>,
}

const ListenersList: FC<SpeakersContainerProps> = ({listeners}) => {
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
