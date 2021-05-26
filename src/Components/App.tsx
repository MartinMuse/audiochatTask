import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {rootState} from "../Redux/store";
import Audiochat from "./Audiochat/Audiochat";

const App: FC = () => {
    const {speakers} = useSelector((state: rootState) => state.speakers)
    const {listeners} = useSelector((state: rootState) => state.listeners)
    const requesters=listeners.filter((el)=>el.actions.speakRequest)



    return (
        <div className={'app'}>
            <Audiochat speakers={speakers}
                       listeners={listeners}
                       requesters={requesters}/>
        </div>
    )


}

export default App;
