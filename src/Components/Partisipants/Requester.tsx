import {Participant} from "./Participant";
import './partisipants.css'
import {IListener} from "../../Redux/Reducers/listenersReducer";

interface IState {
    isHover: boolean
}

interface IRequesterProps {
    setSpeaker: (id: number) => void
}


export class Requester extends Participant<IListener & IRequesterProps, IState> {
    constructor(props: IListener & IRequesterProps) {
        super(props);
        this.state = {
            isHover: false
        }
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    handleMouseMove() {
        this.setState((state) => {
            return {isHover: !state.isHover}
        })
    }

    render = () => {
        return (
            !this.state.isHover
                ? <div className={'listener-item'} onMouseEnter={this.handleMouseMove}
                       onMouseLeave={this.handleMouseMove}>
                    {`${this.props.data.name[0]} ${this.props.data.surname[0]}`}
                </div>
                : <div className={'approve-item'} onMouseEnter={this.handleMouseMove}
                       onMouseLeave={this.handleMouseMove}
                       onClick={() => this.props.setSpeaker(this.props.data.id)}>
                    {'+'}
                </div>
        )
    }


}
