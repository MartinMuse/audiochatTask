import {Participant} from "./Participant";
import './partisipants.css'
import {ISpeaker} from "../../Redux/Reducers/speakersReducer";


export class Speaker extends Participant<ISpeaker,{}>{
    // shouldComponentUpdate(nextProps: Readonly<ISpeaker>, nextState: Readonly<{}>, nextContext: any): boolean {
    //     return this.props.actions.isSpeaking===nextProps.actions.isSpeaking
    // }

    render = () => {
        return (
            <div className={`speaker-item ${this.props.actions.isSpeaking ? 'active' : ''}`}>
                <span>{`${this.props.data.name[0]} ${this.props.data.surname[0]}`}</span>
            </div>
        )
    }
}
