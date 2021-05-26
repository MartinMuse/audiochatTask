import {
    DELETE_LISTENER,
    IDeleteListenerAction,
    ISetSpeakerRequestAction,
    ListenerActionType,
    SET_REQUEST
} from "../types";

export interface IListener {
    data: {
        id: number,
        name: string,
        surname: string,
        role?: string
    }
    actions: {
        speakRequest: boolean
    }
}

export interface IListenersState {
    listeners: Array<IListener>
}

export const initialState: IListenersState = {
    listeners: [
        {
            data: {
                id: 9999,
                name: "Tony",
                surname: "Soprano",
                role: 'listener'
            },
            actions: {
                speakRequest: false,
            }
        },
        {
            data: {
                id: 1234,
                name: "Tony",
                surname: "Montana",
            },
            actions: {
                speakRequest: true,
            }
        }, {
            data: {
                id: 2345,
                name: "John",
                surname: "McClane",
            },
            actions: {
                speakRequest: false,
            }
        },
    ]
}

export const ListenersReducer = (state = initialState, action: ListenerActionType): IListenersState => {
    let listeners = state.listeners
    switch (action.type) {
        case DELETE_LISTENER:
            listeners = listeners.filter(el => el.data.id !== action.payload.id)
            return {
                listeners
            }
        case SET_REQUEST:
            const index = listeners.findIndex((el) => el.data.id === action.payload.id)
            if (index !== -1)
                listeners[index].actions.speakRequest = true
            return {
                listeners
            }
        default :
            return state
    }
};

export const deleteListenerAction = (id: number):IDeleteListenerAction => {
    return {
        type: DELETE_LISTENER,
        payload: {
            id: id
        }
    }
}

export const setSpeakRequestAction = (id: number):ISetSpeakerRequestAction => {
    return {
        type: SET_REQUEST,
        payload: {
            id: id
        }
    }
}

