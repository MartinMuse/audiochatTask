import React, {ReactNode} from "react";


export abstract class Participant<P extends {},S extends {}> extends React.Component<P,S>{
    abstract render: () => ReactNode
}






