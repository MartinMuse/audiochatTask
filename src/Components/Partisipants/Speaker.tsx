import {Participant} from "./Participant";
import './partisipants.css'
import React from "react";
import VolumeMeter from "../../VolumeMeter";


interface ISpeakerProps {
    name: string,
    surname: string,
    isCurrentUser?: boolean
}

interface ISpeakerState {
    isSpeaking: boolean
}


class Speaker extends Participant<ISpeakerProps, ISpeakerState> {
    constructor(props: ISpeakerProps) {
        super(props);
        this.state = {
            isSpeaking: false
        }
    }

    componentDidMount() {
        if (this.props.isCurrentUser)
            navigator.mediaDevices.getUserMedia({audio: true}).then(micStream => {
                const volumeMeter = new VolumeMeter(micStream);
                setInterval(() => {
                    const volume = (volumeMeter.getVolume())
                    if (volume > 10) {
                        return this.setState({
                            isSpeaking: true
                        })
                    }
                    this.setState({
                        isSpeaking: false
                    })
                }, 200);
            });
    }

    render = () => {
        return (
            this.state.isSpeaking && this.props.isCurrentUser ?
                <div className={`speaker-item active`}>
                    <span>{`${this.props.name[0]} ${this.props.surname[0]}`}</span>
                </div> :
                <div className={`speaker-item`}>
                    <span>{`${this.props.name[0]} ${this.props.surname[0]}`}</span>
                </div>

        )
    }
}

export default Speaker
