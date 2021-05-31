import {ISpeaker} from "../../../Redux/Reducers/speakersReducer";
import Speaker from "../../Partisipants/Speaker";
import React, {FC} from "react";
import {RequestButton} from "../../Partisipants/RequestButton";
import {IListener, setSpeakRequestAction} from "../../../Redux/Reducers/listenersReducer";
import {useDispatch} from "react-redux";

interface SpeakersContainerProps {
    speakers: Array<ISpeaker>,
    currentUser:ISpeaker|IListener
}

const SpeakersList: FC<SpeakersContainerProps> = ({speakers, currentUser}) => {
    const dispatch = useDispatch()
    const setRequesterHandler = (id: number) => {
        dispatch(setSpeakRequestAction(id))
    }


    const speakersElements = speakers.map((el) => <li key={el.data.id}>
        <Speaker
            name={el.data.name}
            surname={el.data.surname}
            isCurrentUser={currentUser.data.id === el.data.id}
        />
    </li>)

    return (
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
    )
}

export default SpeakersList
