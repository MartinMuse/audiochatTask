import {
    ADD_SPEAKER,
    IAddSpeakerAction,
    ISpeaksAction,
    SET_IS_SPEAKING,
    SpeakerActionType
} from "../types";

export interface ISpeaker {
    data: {
        id: number,
        name: string,
        surname: string,
        role?: string
    },
    actions: {
        isSpeaking: boolean,
        isActive: boolean
    }
}


export interface ISpeakersState {
    speakers: Array<ISpeaker>
}

const initialState: ISpeakersState = {
    speakers: [
        {
            data: {
                id: 7788,
                name: "Alexander",
                surname: "Gorokhowsky",
                role: 'speaker'
            },
            actions: {
                isSpeaking: true,
                isActive: true
            }
        },
        {
            data: {
                id: 3456,
                name: "Vito",
                surname: "Corleone",
            },
            actions: {
                isSpeaking: false,
                isActive: false
            }
        },
    ],
}

export const SpeakersReducer = (state = initialState, action: SpeakerActionType): ISpeakersState => {
    switch (action.type) {
        case SET_IS_SPEAKING:
            let speakers = initialState.speakers
            const index = initialState.speakers.findIndex((el) => el.data.id === action.payload.id)
            if (index !== -1) {
                speakers[index].actions.isSpeaking = action.payload.isSpeaking
                return {
                    speakers: speakers
                }
            } else{
                return state
            }
        case ADD_SPEAKER:
            return {
                speakers: [...state.speakers, action.payload.speaker]
            }
        default:
            return state
    }
};

export const speaksAction = (id: number, isSpeaking: boolean): ISpeaksAction => {
    return {
        type: SET_IS_SPEAKING,
        payload: {
            id: id,
            isSpeaking: isSpeaking
        }
    }
}

export const addSpeakerAction = (speaker: ISpeaker): IAddSpeakerAction => {
    return {
        type: ADD_SPEAKER,
        payload: {
            speaker: speaker
        }
    }
}

