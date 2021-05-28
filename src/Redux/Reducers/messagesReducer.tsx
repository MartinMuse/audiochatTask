import {ISentMessageAction, MessageActionType, SENT_MESSAGE} from "../types";

export interface IMessage {
    title: string,
    time: string,
    id: number
}

export interface IMessagesState {
    messages: IMessage[]
}

export const initialState: IMessagesState = {
    messages: []
}

export const MessageReducer = (state = initialState, action: MessageActionType): IMessagesState => {
    switch (action.type) {
        case SENT_MESSAGE:
            return {
                messages: [...state.messages, action.payload]
            }
        default :
            return state
    }
};


export const sentMessageAction = (title: string, time: string, id: number): ISentMessageAction => {
    return {
        type: SENT_MESSAGE,
        payload: {
            title: title,
            time: time,
            id: id
        }
    }
}

