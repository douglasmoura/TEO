#pragma strict

public var textura: Sprite;


public class ObjetoFruta extends Objeto {

	private var comunicadorQuantoE : QuantoE;
	public var estavaDentro: boolean;
	private var idPrato: int;
	private var idPrato_Diminuindo: int;

	public function Criar() {
	
		comunicadorQuantoE = FindObjectOfType(typeof(QuantoE)) as QuantoE;
		
		estavaDentro = false;

		//Definindo a texutra dos objetos.
		var sprite: SpriteRenderer;
		sprite = this.GetComponent(SpriteRenderer);
		sprite.sprite = textura;
	
	}
	
	function Atualizar() {
		
		//Debug.Log(comunicadorQuantoE.primeiroValor_corrente + " :1 - 2: " + comunicadorQuantoE.segundoValor_corrente);
		
	}
	
	public function OnMouseUp (){
	
		drag = false;
		
		if(valida && !estavaDentro){
			//Verifica qual o prato esta sendo acrescentado.
			if(idPrato == 0){ 
				/*Verifica se ja alcançou o valor pedido, caso nao volta ao canto.
				*
				* Obs. Esse -1 no "if" abaixo e devido, pois ao adicionar uma fruta o valor corrente ira para 0 e nao 1,
				* isso porem nao influencia o codigo e pode ser melhorada com um if o valor corrente == 0 entao adicione +2.
				*
				*/
				if(comunicadorQuantoE.primeiroValor_corrente <= comunicadorQuantoE.primeiro_valor -1){
					Debug.Log("Corre: " + comunicadorQuantoE.primeiroValor_corrente + "- " + comunicadorQuantoE.primeiro_valor);
					comunicadorQuantoE.primeiroValor_corrente++;
				}else{
					comunicadorQuantoE.AddErro();
					valida = false;
				}

			}else if(idPrato == 1){
				if(comunicadorQuantoE.segundoValor_corrente <= comunicadorQuantoE.segundo_valor -1){
					Debug.Log("Corre: " + comunicadorQuantoE.segundoValor_corrente + "- " + comunicadorQuantoE.segundo_valor);
					comunicadorQuantoE.segundoValor_corrente++;
				}else{
					comunicadorQuantoE.AddErro();
					valida = false;
				}
			}
			estavaDentro = true;	
			
		}else if(!valida && estavaDentro){
			if(idPrato_Diminuindo == 0){
				comunicadorQuantoE.primeiroValor_corrente--;
			}else if(idPrato_Diminuindo == 1){
				comunicadorQuantoE.segundoValor_corrente--;
			}
			estavaDentro = false;	
			
		}else{
			comunicadorQuantoE.AddDragDrop();
		}
	}
	
	function OnTriggerEnter2D(colisor: Collider2D) {
	
		if(colisor.gameObject.tag == "PrimeiroPrato"){
			valida = true;
			idPrato = 0;
		}else if(colisor.gameObject.tag == "SegundoPrato"){
			valida = true;
			idPrato = 1;
		}
	
	}
	
	function OnTriggerExit2D(colisor : Collider2D){
		
		valida = false;
		
		if(colisor.gameObject.tag == "PrimeiroPrato"){
			idPrato_Diminuindo = 0;
		}else if(colisor.gameObject.tag == "SegundoPrato"){
			idPrato_Diminuindo = 1;
		}
	}

}