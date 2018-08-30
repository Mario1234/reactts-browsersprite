import React from "react";
import { Sprite } from "./Sprite";

export interface SpriteControladoProps { 
  etiquetaBoton: string;
  filename: string;  
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
  posx: number;
  posy: number;
  lienzoPrincR: React.RefObject<HTMLCanvasElement> | null;
  desplazax: number;
  desplazay: number;
  funcionActualizaPosicion: (x : number, y : number)=>void;
}

export class SpriteControlado extends React.Component<SpriteControladoProps, {}> {  
  private spriteR : React.RefObject<Sprite>;
  private botonR: React.RefObject<HTMLButtonElement>;
  private spriteAux : Sprite | null;
  private estilo = {};	
  private moviendo : boolean;

  public mover(){//elem: HTMLElement, ev: MouseEvent): any | null{    
    if(this.spriteAux!=null){
      this.spriteAux.setMover(true);
      this.moviendo=true;
    }
  }

  public parar(){
    if(this.spriteAux!=null){
      this.spriteAux.setMover(false);
      this.moviendo=false;
      //actualiza posicion del objeto personaje, indicando coordenadas donde esta dibujando el sprite en el lienzo
      this.props.funcionActualizaPosicion(this.spriteAux.getX(),this.spriteAux.getY());
    }
  }

  public seEstaMoviendo(): boolean{
    return this.moviendo;
  }

  static defaultProps = {
    etiquetaBoton:"",
    filename:"moverArriba2.png",
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
    posx: 0,
    posy: 0,
    lienzoPrincR: -1,
    desplazax:0,
    desplazay:0,
    funcionActualizaPosicion:null
  };

  constructor(props: any) {
    super(props); 
    this.spriteR=React.createRef();    
    this.botonR=React.createRef();
    this.estilo = {display : "none"};
    if(this.props.lienzoPrincR!=null)this.estilo={};  
    this.spriteAux = null;  
    this.moviendo = false;
  }

  componentDidMount() {
    this.spriteAux = this.spriteR.current;
    let boton : HTMLButtonElement | null = this.botonR.current;
    if(boton!=null){
      boton.onmousedown = ()=>this.mover();
      boton.onmouseup = ()=>this.parar();
    }
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps: Readonly<SpriteControladoProps>, prevState: Readonly<{}>) {
    
  }  

  render() {
    console.log("rendSprCont");
    const spriteData = {
      filename: this.props.filename,
      bounds: this.props.bounds,
      speed: this.props.speed,
      marcosPorFila: this.props.marcosPorFila,
      numeroFilas: this.props.numeroFilas,
      marcosUltimaFila: this.props.marcosUltimaFila, 
      posinix: this.props.posx,
      posiniy: this.props.posy,
      lienzoPrincR: this.props.lienzoPrincR,
      desplazax: this.props.desplazax,
      desplazay: this.props.desplazay
    };    
    
    return (
      <div>
        <Sprite 
          ref={this.spriteR} 
          {...spriteData} />
        <button ref={this.botonR} style={this.estilo}>{this.props.etiquetaBoton}</button>       
      </div>
    );
  }
};
