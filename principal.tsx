import React from "react";
import ReactDOM from "react-dom";

import {PersonajeSprite} from "./PersonajeSprite";

let lienzoPrinR : React.RefObject<HTMLCanvasElement> | null;
lienzoPrinR = React.createRef();

function Nazi() {
    return (
        <PersonajeSprite
            filenameArriba="moverArriba2.png"
            filenameAbajo="moverAbajo2.png"
            filenameDerecha="moverDerecha2.png"
            filenameIzquierda="moverIzquierda2.png"
            bounds={{ x: 0, y: 0, width: 216, height: 41 }}
            speed={400}
            marcosPorFila={8}
            numeroFilas={1}
            marcosUltimaFila={8} 
            posinix={200}
            posiniy={200}
            lienzoPrincR={lienzoPrinR}/>					
    );
}
    
ReactDOM.render(<canvas ref={lienzoPrinR} width={640} height={425} />, document.getElementById('contenedor1'));
ReactDOM.render(<Nazi />, document.getElementById('contenedor2'));
