import React from "react";
import { Poses } from "./Poses";

export interface SpriteProps { 
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
  posinix: number;
  posiniy: number;
  lienzoPrincR: React.RefObject<HTMLCanvasElement> | null;
  desplazax: number;
  desplazay: number;
}

export interface SpriteState {  
  posx: number,
  posy: number
}

export class Sprite extends React.Component<SpriteProps, SpriteState> {  
  private timerId : number;
  private posesR : React.RefObject<Poses>;
  private lienzoR : React.RefObject<HTMLCanvasElement>;
  private contexto: any;// CanvasRenderingContext2D | null;
  private contextoOculto: any;
  private anchoMarco: number;
  private altoMarco: number;
  private maxFrames : number;
  private frame : number;
  private mover : boolean;
  private coordx : number;
  private coordy : number;
  private lienzoPrincR : React.RefObject<HTMLCanvasElement> | null;
  private estilo = {};

  public setMover(mov: boolean){
    this.mover=mov;
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
    this.mover=true;
    this.lienzoR = React.createRef();
    this.lienzoPrincR=null; 
    if(this.props.lienzoPrincR!=null){
      this.lienzoPrincR = this.props.lienzoPrincR;//React.createRef();
      this.mover=false;
      this.coordx=this.props.posinix;
      this.coordy=this.props.posiniy;
    }
    else{           
      this.coordx=0;
      this.coordy=0;
    }
    this.posesR = React.createRef();
    this.anchoMarco = this.props.bounds.width/this.props.marcosPorFila;
    this.altoMarco = this.props.bounds.height/this.props.numeroFilas;
    this.frame=0;

    this.timerId = -1;
    this.maxFrames = (this.props.marcosPorFila * this.props.numeroFilas) - (this.props.marcosPorFila-this.props.marcosUltimaFila);    

    this.state = {        
      posx: -1,
      posy: -1
    };
  }

  componentDidMount() {
    //recoge los contextos de los lienzos
    let lienzo : HTMLCanvasElement | null = this.lienzoR.current;				
    if(this.lienzoPrincR!=null){
      this.estilo={display : "none"};//ocultar el lienzo de este Sprite si se le pasa el lienzo principal como parametro
      lienzo = this.lienzoPrincR.current;
    }

		if(lienzo!=null) this.contexto = lienzo.getContext("2d");
    else this.contexto = null;		
    let pose : Poses | null = this.posesR.current;
    if(pose!=null){
      this.contextoOculto = pose.getContextoOculto();
    }

    console.log("una  vez");
    //comienza el temporizador con eventos de rendering por hacer setState
    //tic del temporizador -> render (pone el canvas) -> componentDidUpdate (pinta en el canvas)
    this.timerId = window.setInterval(() => {
      if(this.mover){
        if (this.frame === this.maxFrames) {
          this.frame=0;
        }      
        else{
          this.frame++;
        }
        this.setState({
          posx : this.anchoMarco * Math.floor(this.frame%this.props.marcosPorFila),
          posy : this.altoMarco * Math.floor(this.frame/this.props.marcosPorFila)  
        });
      }         

      return 1;
    }, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidUpdate(prevProps: Readonly<SpriteProps>, prevState: Readonly<SpriteState>) {
    //pinta la pose en el lienzo    
    let imagenPose : ImageBitmap | null;
    if(this.contextoOculto!=null){
      imagenPose = this.contextoOculto.getImageData(this.state.posx,this.state.posy,this.anchoMarco,this.altoMarco);
      //console.log("getIm"+this.state.posx+this.state.posy); 
      //console.log(contextoOculto.canvas.height);
    }
    else imagenPose=null;
    if(imagenPose!=null && this.contexto!=null){
      this.contexto.putImageData(imagenPose, this.coordx,this.coordy);
      if(this.props.lienzoPrincR!=null){
        this.coordx+=this.props.desplazax;
        this.coordy+=this.props.desplazay;
        //console.log("mov"+this.coordx+this.coordy);
      }
      //console.log("sprite: "+this.props.filename+this.state.posx+this.state.posy);  
    }	
  }

  render() {
    //console.log("rendSpr");
    //console.log("num renderizado: "+this.props.filename+this.state.frame);
    const posesData = {
      filename: this.props.filename
    };    
    
    return (
      <div>
        <Poses ref={this.posesR} {...posesData} />
        <canvas ref={this.lienzoR} width={640} height={425} style={this.estilo}/>        
      </div>
    );
  }
};
