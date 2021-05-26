import {applyMiddleware, combineReducers, createStore} from "redux";

import {SpeakersReducer} from "./Reducers/speakersReducer";
import {ListenersReducer} from "./Reducers/listenersReducer";
import {MessageReducer} from "./Reducers/messagesReducer";

const rootReducer = combineReducers({
    speakers: SpeakersReducer,
    listeners: ListenersReducer,
    messages: MessageReducer,
})

const store = createStore(rootReducer, applyMiddleware())

export type rootState = ReturnType<typeof rootReducer>

export default store
