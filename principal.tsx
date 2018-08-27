import React from "react";
import ReactDOM from "react-dom";

import {SpriteControlado} from "./SpriteControlado";

let lienzoPrinR : React.RefObject<HTMLCanvasElement> | null;
lienzoPrinR = React.createRef();

function PersonaCorriendo() {
    return (
        <SpriteControlado
            filename="axe8.png"
            bounds={{ x: 0, y: 0, width: 1024, height: 489 }}
            speed={400}
            marcosPorFila={8}
            numeroFilas={3}
            marcosUltimaFila={6} 
            posiniTx={0}
            posiniTy={0}
            lienzoPrincR={lienzoPrinR}
            desplazax={10}
            desplazay={0}/>					
    )
}
function GatoCorriendo() {
    return (
        <SpriteControlado
            filename="cat-running.png"
            bounds={{ x: 0, y: 0, width: 2048, height: 512 }}
            speed={400} 
            marcosPorFila={4} 
            numeroFilas={2}
            marcosUltimaFila={4}
            posiniTx={0}
            posiniTy={0}
            lienzoPrincR={null}
            desplazax={0}
            desplazay={0}/>					
    )
}	
function Ninja() {
    return (
        <SpriteControlado
            filename="billylee.png"
            bounds={{ x: 0, y: 0, width: 1010, height: 271 }}
            speed={400} 
            marcosPorFila={7}
            numeroFilas={2}	
            marcosUltimaFila={5}
            posiniTx={0}
            posiniTy={0}
            lienzoPrincR={null}
            desplazax={0}
            desplazay={0} />					
    )
}
    
ReactDOM.render(<canvas ref={lienzoPrinR} width={640} height={425} />, document.getElementById('contenedor1'));
ReactDOM.render(<PersonaCorriendo />, document.getElementById('contenedor2'));
ReactDOM.render(<GatoCorriendo />, document.getElementById('contenedor3'));
ReactDOM.render(<Ninja />, document.getElementById('contenedor4'));
