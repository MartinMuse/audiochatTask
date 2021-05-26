import {Participant} from "./Participant";
import './partisipants.css'
import {IListener} from "../../Redux/Reducers/listenersReducer";


interface IRequesterProps {
    id: number
    setRequest: (id: number) => void
}


export class RequestButton extends Participant<IRequesterProps, {}> {
    render = () => {
        return (
            <div className={'approve-item'} onClick={() => this.props.setRequest(this.props.id)}>
                {'+'}
            </div>
        )
    }


}
