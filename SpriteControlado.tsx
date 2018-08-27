import React from "react";
import { Sprite } from "./Sprite";

export interface SpriteControladoProps { 
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
  posiniTx: number;
  posiniTy: number;
  lienzoPrincR: React.RefObject<HTMLCanvasElement> | null;
  desplazax: number;
  desplazay: number;
}

export class SpriteControlado extends React.Component<SpriteControladoProps, {}> {  
  private coordx: number;
  private coordy: number;
  private spriteR : React.RefObject<Sprite>;
  private botonR: React.RefObject<HTMLButtonElement>;
  private spriteAux : Sprite | null;
  private estilo = {};	

  public mover(){//elem: HTMLElement, ev: MouseEvent): any | null{    
    if(this.spriteAux!=null)this.spriteAux.setMover(true);
  }

  public parar(){
    if(this.spriteAux!=null)this.spriteAux.setMover(false);
  }

  static defaultProps = {
    frame: {
      width: 0,
      height: 0,
    },
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
    lienzoPrincR: -1,
    desplazax:0,
    desplazay:0
  };

  constructor(props: any) {
    super(props); 
    this.coordx=this.props.posiniTx;
    this.coordy=this.props.posiniTy;
    this.spriteR=React.createRef();    
    this.botonR=React.createRef();
    this.estilo = {display : "none"};
    if(this.props.lienzoPrincR!=null)this.estilo={};  
    this.spriteAux = null;  
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
    //console.log("rendSpr");
    //console.log("num renderizado: "+this.props.filename+this.state.frame);
    const spriteData = {
      filename: this.props.filename,
      bounds: this.props.bounds,
      speed: this.props.speed,
      marcosPorFila: this.props.marcosPorFila,
      numeroFilas: this.props.numeroFilas,
      marcosUltimaFila: this.props.marcosUltimaFila, 
      posinix: this.coordx,
      posiniy: this.coordy,
      lienzoPrincR: this.props.lienzoPrincR,
      desplazax: this.props.desplazax,
      desplazay: this.props.desplazay,
    };    
    
    return (
      <div>
        <Sprite ref={this.spriteR} {...spriteData} />
        <button ref={this.botonR} style={this.estilo}>Andar</button>       
      </div>
    );
  }
};
