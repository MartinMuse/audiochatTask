import React, {ReactNode} from "react";


export abstract class Participant<P extends {},S extends {}> extends React.PureComponent<P,S>{
    abstract render: () => ReactNode
}






