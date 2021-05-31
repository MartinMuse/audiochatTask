import React, {FC} from 'react';
import {ISpeaker} from "../../Redux/Reducers/speakersReducer";
import {IListener} from "../../Redux/Reducers/listenersReducer";
import './Audiochat.css'
import {Chat} from "../Chat/Chat";
import SpeakersList from "./UserContainers/SpeakersList";
import ListenersList from "./UserContainers/ListenersList";
import RequestedListenersList from "./UserContainers/RequestedListenersList";

interface IAudioChatProps {
    speakers: Array<ISpeaker>,
    listeners: Array<IListener>,
    requesters: Array<IListener>,
}

const Audiochat: FC<IAudioChatProps> = ({speakers, listeners}) => {
    const currentUser = listeners[0]// установка текущего пользователя
    return (
        <div className={'audiochat-container'}>
            <div className={"users-container"}>
               <SpeakersList speakers={speakers} currentUser={currentUser} />
                <hr/>
               <ListenersList listeners={listeners}/>
                <hr/>
               <RequestedListenersList listeners={listeners} currentUserRole={currentUser.data.role}/>
            </div>
            <Chat currentUserRole={currentUser.data.role}/>
        </div>
    );
};

export default Audiochat;
