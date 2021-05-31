import {Participant} from "./Participant";
import './partisipants.css'
import {IListener} from "../../Redux/Reducers/listenersReducer";

export class Listener extends Participant<IListener,{}> {

    render = () => {
        return(
            <div className={'listener-item'}>
                {`${this.props.data.name[0]} ${this.props.data.surname[0]}`}
            </div>
        )
    }




    }
