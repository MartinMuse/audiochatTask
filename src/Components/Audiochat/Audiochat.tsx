import React, {FC, useState} from 'react';
import {addSpeakerAction, ISpeaker} from "../../Redux/Reducers/speakersReducer";
import {deleteListenerAction, IListener, setSpeakRequestAction} from "../../Redux/Reducers/listenersReducer";
import {Speaker} from "../Partisipants/Speaker";
import {Listener} from "../Partisipants/Listener";
import './Audiochat.css'
import VolumeMeter from "../../VolumeMeter";
import {useDispatch} from "react-redux";
import {Requester} from "../Partisipants/Requester";
import {RequestButton} from "../Partisipants/RequestButton";
import {Chat} from "../Chat/Chat";

interface IAudioChatProps {
    speakers: Array<ISpeaker>,
    listeners: Array<IListener>,
    requesters: Array<IListener>,
}


const Audiochat: FC<IAudioChatProps> = ({speakers, listeners}) => {

    const requestListeners = listeners.filter((el) => el.actions.speakRequest)
    const notRequestListeners = listeners.filter((el) => !el.actions.speakRequest)
    const currentUser = speakers[0]// установка текущего пользователя
    const [isSpeaking, setIsSpeaking] = useState(false)

    if (currentUser.data.role === 'speaker')
        currentUser.actions.isSpeaking = isSpeaking
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

//Микрофон здесь
    if (currentUser.data.role === 'speaker')
        navigator.mediaDevices.getUserMedia({audio: true}).then(micStream => {
            const volumeMeter = new VolumeMeter(micStream);
            setInterval(() => {
                const volume = (volumeMeter.getVolume())
                if (volume > 20) {          //настройка громкости
                    setIsSpeaking(true)
                } else if (volume <= 2) {
                    setIsSpeaking(false)
                }
            }, 300);
        });

    const speakersElements = speakers.map((el) => <li key={el.data.id}>
        <Speaker
            data={el.data}
            actions={el.actions}
        />
    </li>)

    const listenersElements = notRequestListeners.map(el => <li key={el.data.id}>
        <Listener
            data={el.data}
            actions={el.actions}
        />
    </li>)

    const requestersElements = requestListeners.map(el => (
        currentUser.data.role === 'speaker'
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
                                        setRequest={setRequesterHandler}
                                    />
                                </li>
                                : <></>
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
