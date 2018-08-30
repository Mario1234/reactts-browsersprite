import React from "react";
import { SpriteControlado } from "./SpriteControlado";

export interface PersonajeSpriteProps { 
    filenameArriba: string;  
    filenameAbajo: string; 
    filenameIzquierda: string; 
    filenameDerecha: string; 
    bounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    speed: number;
    marcosPorFila: number;
    numeroFilas: number;
    marcosUltimaFila: number;  
    posinix: number;
    posiniy: number;
    lienzoPrincR: React.RefObject<HTMLCanvasElement> | null;
  }

  export interface PersonajeSpriteState {  
    posx: number,
    posy: number
  }
  
  export class PersonajeSprite extends React.Component<PersonajeSpriteProps, PersonajeSpriteState> {  

    public actualizaPosicion(x:number, y:number){
        console.log(""+x+y);
        this.setState({
            posx:x,
            posy:y
        });
    }
  
    static defaultProps = {
      filenameArriba: "moverArriba2.png",  
      filenameAbajo: "moverArriba2.png", 
      filenameIzquierda: "moverArriba2.png", 
      filenameDerecha: "moverArriba2.png", 
      bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      speed: 300,
      marcosPorFila: 4,
      numeroFilas: 1,
      marcosUltimaFila: 4,
      posinix: 0,
      posiniy: 0,
      lienzoPrincR: -1
    };
  
    constructor(props: any) {
      super(props); 
      this.state={
          posx:this.props.posinix,
          posy:this.props.posiniy
      };      
    }
  
    componentDidMount() {
      
    }
  
    componentWillUnmount() {
  
    }
  
    componentDidUpdate(prevProps: Readonly<PersonajeSpriteProps>, prevState: Readonly<PersonajeSpriteState>) {
      
    }    
  
    render() {
      console.log("rendPersSpr");
      
      return (
        <div>
            <SpriteControlado                  
                filename={this.props.filenameArriba}
                etiquetaBoton="Arriba"
                bounds={this.props.bounds}
                speed={this.props.speed}
                marcosPorFila={this.props.marcosPorFila}
                numeroFilas={this.props.numeroFilas}
                marcosUltimaFila={this.props.marcosUltimaFila} 
                posx={this.state.posx}
                posy={this.state.posy}
                lienzoPrincR={ this.props.lienzoPrincR}
                desplazax={0}
                desplazay={-5}
                funcionActualizaPosicion={(x : number, y : number)=>this.actualizaPosicion(x,y)} />      
            <SpriteControlado                 
                filename={this.props.filenameAbajo}
                etiquetaBoton="Abajo"
                bounds={this.props.bounds}
                speed={this.props.speed}
                marcosPorFila={this.props.marcosPorFila}
                numeroFilas={this.props.numeroFilas}
                marcosUltimaFila={this.props.marcosUltimaFila} 
                posx={this.state.posx}
                posy={this.state.posy}
                lienzoPrincR={ this.props.lienzoPrincR}
                desplazax={0}
                desplazay={5}
                funcionActualizaPosicion={(x : number, y : number)=>this.actualizaPosicion(x,y)} /> 
            <SpriteControlado                 
                filename={this.props.filenameIzquierda}
                etiquetaBoton="Izquierda"
                bounds={this.props.bounds}
                speed={this.props.speed}
                marcosPorFila={this.props.marcosPorFila}
                numeroFilas={this.props.numeroFilas}
                marcosUltimaFila={this.props.marcosUltimaFila} 
                posx={this.state.posx}
                posy={this.state.posy}
                lienzoPrincR={ this.props.lienzoPrincR}
                desplazax={-5}
                desplazay={0}
                funcionActualizaPosicion={(x : number, y : number)=>this.actualizaPosicion(x,y)} /> 
            <SpriteControlado                 
                filename={this.props.filenameDerecha}
                etiquetaBoton="Derecha"
                bounds={this.props.bounds}
                speed={this.props.speed}
                marcosPorFila={this.props.marcosPorFila}
                numeroFilas={this.props.numeroFilas}
                marcosUltimaFila={this.props.marcosUltimaFila} 
                posx={this.state.posx}
                posy={this.state.posy}
                lienzoPrincR={ this.props.lienzoPrincR}
                desplazax={5}
                desplazay={0}
                funcionActualizaPosicion={(x : number, y : number)=>this.actualizaPosicion(x,y)} /> 
        </div>
      );
    }
  };