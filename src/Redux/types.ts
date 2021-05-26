import {ISpeaker} from "./Reducers/speakersReducer";

export const DELETE_LISTENER = "DELETE_LISTENER"
export const SET_REQUEST = "SET_REQUEST"
export const SET_IS_SPEAKING = 'SET_IS_SPEAKING'
export const ADD_SPEAKER = 'ADD_SPEAKER'
export const SENT_MESSAGE="SENT_MESSAGE"



export interface ISetSpeakerRequestAction {
    type: typeof SET_REQUEST,
    payload: {
        id: number
    }
}

export interface IDeleteListenerAction {
    type: typeof DELETE_LISTENER,
    payload: {
        id: number
    }
}

export interface ISpeaksAction {
    type: typeof SET_IS_SPEAKING,
    payload: {
        id: number,
        isSpeaks: boolean
    }
}

export interface IAddSpeakerAction {
    type: typeof ADD_SPEAKER,
    payload: {
        speaker: ISpeaker
    }
}

export interface ISentMessageAction {
    type:typeof SENT_MESSAGE,
    payload:{
        title:string,
        time:string
    }
}

export type MessageActionType=ISentMessageAction
export type SpeakerActionType = IAddSpeakerAction | ISpeaksAction
export type ListenerActionType = IDeleteListenerAction | ISetSpeakerRequestAction
