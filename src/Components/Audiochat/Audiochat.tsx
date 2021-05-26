import React, {FC, useEffect} from 'react';
import {addSpeakerAction, ISpeaker, speaksAction} from "../../Redux/Reducers/speakersReducer";
import {deleteListenerAction, IListener, setSpeakRequestAction} from "../../Redux/Reducers/listenersReducer";
import {Speaker} from "../Partisipants/Speaker";
import {Listener} from "../Partisipants/Listener";
import './Audiochat.css'
import VolumeMeter from "../../VolumeMeter";
import {useDispatch} from "react-redux";
import {Requester} from "../Partisipants/Requester";
import {RequestButton} from "../Partisipants/RequestButton";
import Chat from "../Chat/Chat";

interface IAudioChatProps {
    speakers: Array<ISpeaker>,
    listeners: Array<IListener>,
    requesters: Array<IListener>,
}


const Audiochat: FC<IAudioChatProps> = ({speakers, listeners}) => {

    const requestListeners = listeners.filter((el) => el.actions.speakRequest)
    const notRequestListeners = listeners.filter((el) => !el.actions.speakRequest)
    const currentUser = speakers[0]// установка текущего пользователя
    const dispatch = useDispatch()

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

    const setRequesterHandler = (id: number) => {
        dispatch(setSpeakRequestAction(id))
    }


    if (currentUser.data.role === 'speaker')
        navigator.mediaDevices.getUserMedia({audio: true}).then(micStream => {
            const volumeMeter = new VolumeMeter(micStream);
            setInterval(() => {
                const volume = (volumeMeter.getVolume())
                if (volume > 12) {
                    dispatch(speaksAction(currentUser.data.id, true))
                } else if (volume < 2) {
                    dispatch(speaksAction(currentUser.data.id, false))
                }
            }, 40);
        });

    const speakersElements = speakers.map((el) => <li>
        <Speaker
            data={el.data}
            actions={el.actions}
            key={el.data.id}
        />
    </li>)

    const listenersElements = notRequestListeners.map(el => <li>
        <Listener
            data={el.data}
            actions={el.actions}
            key={el.data.id}
        />
    </li>)

    const requestersElements = requestListeners.map(el => (
        currentUser.data.role === 'speaker'
            ? <li>
                <Requester
                    data={el.data}
                    actions={el.actions}
                    key={el.data.id}
                    setSpeaker={setSpeakerHandler}
                />
            </li>
            : <li>
                <Listener
                    data={el.data}
                    actions={el.actions}
                    key={el.data.id}
                />
            </li>))


    return (
        <div className={'audiochat-container'}>
            <div className={"users-container"}>
                <div className="usersBlock">
                    <h1>Speakers</h1>
                    <ul className="speakers-list">
                        {speakersElements}
                        {
                            // @ts-ignore
                            currentUser.data.role !== 'speaker' && !currentUser.actions.speakRequest
                                ? <li>
                                    <RequestButton
                                        id={currentUser.data.id}
                                        key={currentUser.data.id}
                                        setRequest={setRequesterHandler}
                                    />
                                </li>
                                :<></>
                        }
                    </ul>
                </div>
                <hr/>
                <div className="usersBlock">
                    <h1>Listeners</h1>
                    <ul className="listeners-list">
                        {listenersElements}
                    </ul>
                </div>
                <hr/>
                <div className={"requestersBlock"}>
                    <h1>Want to speak</h1>
                    <ul className="requesters-list">
                        {requestersElements}
                    </ul>
                </div>
            </div>
            <Chat currentUserRole={currentUser.data.role}/>
        </div>
    );
};

export default Audiochat;
