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
  posPosesX: number,
  posPosesY: number
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
  private mover : boolean;
  private coordx : number;
  private coordy : number;
  private lienzoPrincR : React.RefObject<HTMLCanvasElement> | null;
  private estilo = {};
  private marco: number;

  public setMover(mov: boolean){
    this.mover=mov;
  } 

  public getX():number{
    return this.coordx;
  }

  public getY():number{
    return this.coordy;
  }

  static defaultProps = {
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
      this.estilo={display : "none"};//ocultar el lienzo de este Sprite si se le pasa el lienzo principal como parametro
      this.mover=false;
      this.coordx=this.props.posinix;
      this.coordy=this.props.posiniy;
    }
    else{      
      console.log("e");     
      this.coordx=0;
      this.coordy=0;
    }
    this.posesR = React.createRef();
    this.anchoMarco = this.props.bounds.width/this.props.marcosPorFila;
    this.altoMarco = this.props.bounds.height/this.props.numeroFilas;

    this.timerId = -1;
    this.maxFrames = (this.props.marcosPorFila * this.props.numeroFilas) - (this.props.marcosPorFila-this.props.marcosUltimaFila);    

    this.marco=0;

    this.state = {        
      posPosesX: -1,
      posPosesY: -1
    };
  }

  //1ra vez se ejecuta: constructor->render->componentDidMount
  componentDidMount() {
    //recoge los contextos de los lienzos
    let lienzo : HTMLCanvasElement | null = this.lienzoR.current;				
    if(this.lienzoPrincR!=null){
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
      //console.log(".");
      if(this.mover){
        if (this.marco === this.maxFrames) {
          this.marco=0;
        }      
        else{
          this.marco++;
        }
        //actualiza la posicion de lectura de la imagen poses, para leer el siguiente marco(pose) del sprite
        this.setState({
          posPosesX : this.anchoMarco * Math.floor(this.marco%this.props.marcosPorFila),
          posPosesY : this.altoMarco * Math.floor(this.marco/this.props.marcosPorFila)  
        });
      }         

      return 1;
    }, this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  //las demas veces que no son la primera se ejecuta: setState->render->componentDidUpdate
  //el setState lo puede disparar este objeto o cualquier otro objeto superior en la jerarquia de composicion, como por ejemplo PersonajeSprite
  //esto ocurre porque los state del objeto superior los pasa hasta este por los props, 
  //(SpriteControladoProps) posx={this.state.posx} -> (Sprite) posinix: this.props.posx
  componentDidUpdate(prevProps: Readonly<SpriteProps>, prevState: Readonly<SpriteState>) {        
    //lee la pose de la imagen poses  
    let imagenPose : ImageBitmap | null;
    if(this.contextoOculto!=null){
      //console.log(".");
      imagenPose = this.contextoOculto.getImageData(this.state.posPosesX,this.state.posPosesY,this.anchoMarco,this.altoMarco);
      //console.log("getIm"+this.state.posx+this.state.posy); 
      //console.log(contextoOculto.canvas.height);
    }
    else imagenPose=null;
    //pinta la pose en el lienzo      
    if(imagenPose!=null && this.contexto!=null){
      //console.log("-"); 
      let lienzo : HTMLCanvasElement | null = this.lienzoR.current;	
      if(lienzo!=null && this.mover)this.contexto.clearRect(0, 0, lienzo.width, lienzo.height);//limpia el lienzo
      //pone la pose en la nueva posicion del lienzo, pareciendo que se mueve el personaje      
      this.contexto.putImageData(imagenPose, this.coordx,this.coordy);
      if(this.props.lienzoPrincR!=null){
        this.coordx+=this.props.desplazax;
        this.coordy+=this.props.desplazay;
        //console.log("mov"+this.coordx+this.coordy);
      }
      //console.log("sprite: "+this.props.filename+this.state.posx+this.state.posy);  
    }	
  }

  //en este metodo todavia no estan cargados los elementos DOM, por eso se suelen utilizar los metodos componentDidMount
  //y componentDidUpdate
  render() {
    //console.log("rendSpr");
    //console.log("num renderizado: "+this.props.filename+this.state.frame);
    if(this.props.lienzoPrincR!=null && !this.mover){
      this.coordx=this.props.posinix;
      this.coordy=this.props.posiniy;
    }
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
