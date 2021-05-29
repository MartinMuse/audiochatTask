import {addSpeakerAction, ISpeaker} from "../../../Redux/Reducers/speakersReducer";
import Speaker from "../../Partisipants/Speaker";
import React, {FC} from "react";
import {RequestButton} from "../../Partisipants/RequestButton";
import {deleteListenerAction, IListener, setSpeakRequestAction} from "../../../Redux/Reducers/listenersReducer";
import {useDispatch} from "react-redux";
import {Listener} from "../../Partisipants/Listener";
import {Requester} from "../../Partisipants/Requester";

interface SpeakersContainerProps {
    listeners: Array<IListener>,
    currentUserRole?: string
}

const RequestedListenersList: FC<SpeakersContainerProps> = ({listeners,currentUserRole}) => {
    const dispatch=useDispatch()
    const requestListeners = listeners.filter((el) => el.actions.speakRequest)
    const setSpeakerHandler = (id: number) => {
        const listener = listeners.find(el => el.data.id === id)
        if (listener) {
            const newSpeaker = {
                data: listener.data,
                actions: {
                    isSpeaking: false,
                    isActive: false
                }
            }
            dispatch(addSpeakerAction(newSpeaker))
            dispatch(deleteListenerAction(newSpeaker.data.id))
        }
    }
    const requestersElements = requestListeners.map(el => (
        currentUserRole === 'speaker'
            ? <li key={el.data.id}>
                <Requester
                    data={el.data}
                    actions={el.actions}
                    setSpeaker={setSpeakerHandler}
                />
            </li>
            : <li key={el.data.id}>
                <Listener
                    data={el.data}
                    actions={el.actions}
                />
            </li>))
    return (
        <div className={"requestersBlock"}>
            <h1>Want to speak</h1>
            <ul className="requesters-list">
                {requestersElements}
            </ul>
        </div>
    )
}

export default RequestedListenersList
