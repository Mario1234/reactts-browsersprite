import React from "react";

export interface PosesProps { 
	filename: string;
}

export interface PosesState {  
	anchoImaPoses: number,
	alturaImaPoses: number
}

export class Poses extends React.Component<PosesProps,PosesState>{
	
	private lienzoOcultoR : React.RefObject<HTMLCanvasElement>;
	private imagenR : React.RefObject<HTMLImageElement>;
	private contextoOculto: any;

	public getContextoOculto() : any {
		return this.contextoOculto;
	}
	
	constructor(props:any){
		super(props);		
		this.lienzoOcultoR = React.createRef();
		this.imagenR = React.createRef();	
		this.state={
			anchoImaPoses: -1,
			alturaImaPoses: -1
		}
	}

	//constructor despues de cargar los DOM
	componentDidMount() {

		//recoge la imagen de poses y el contexto del lienzo oculto
		let lienzoOculto : HTMLCanvasElement | null = this.lienzoOcultoR.current;
		if(lienzoOculto!=null) this.contextoOculto = lienzoOculto.getContext("2d");
		else this.contextoOculto = null;		
		let imagenPoses : HTMLImageElement | null;
		if(this.imagenR.current!=null) imagenPoses = this.imagenR.current;
		else imagenPoses = null;
		//console.log("poses sin cargar");
		if(imagenPoses != null){
			imagenPoses.onload = () => {
				if(imagenPoses != null){
					//deja la imagen de poses dibujada en el lienzo oculto			
					this.setState({
						alturaImaPoses: imagenPoses.height,
						anchoImaPoses: imagenPoses.width
					});
					this.contextoOculto.drawImage(imagenPoses,0,0);
					//console.log("poses cargada?"+this.alturaImaPoses+this.anchoImaPoses);
				}
			}
		}					
	}

	shouldComponentUpdate(nextProps: Readonly<PosesProps>, nextState: Readonly<PosesState>) {
		if (this.state.alturaImaPoses!=nextState.alturaImaPoses) {
			return true;
		}
		return false;
	}

	render(){
		let {filename} = this.props;
		if (!filename) {
			return null;
		}
		//si intentamos pegar una imagen recortada con style clip en un canvas, nos pega la imagen sin recortar
		//rect(posy,ancho,alto,posx)
		/* const estilo = {
			clip: `rect(${y}px,${x+width}px,${y+height}px,${x}px)`,
			position: 'fixed' as 'fixed',
			display : "none"
		}; */
		const estilo2 = {
			display : "none"
		};			
		console.log("num renderizado: "+filename);
		
		return (
			<div>
				<img ref={this.imagenR} style={estilo2} src={filename}/>				
      			<canvas ref={this.lienzoOcultoR} width={this.state.anchoImaPoses} height={this.state.alturaImaPoses} style={estilo2}/>
			</div>
		);
	}
};


