#pragma strict

/**
 * Classe que molda as roupas que serao arrastadas do jogo Vestir.
 * 
 * Author: Douglas
 * Date: 11/09/15
**/ 
public class ObjetoVestir extends Objeto {

	private var vestir: Vestir;
	//Coletar o DragAndDrop;
	private var colidiuOutraPeca: boolean;
		
	public static final var MEIA = "Tres";
	public static final var TENIS = "Quatro";
	
	
	
	/*******************************************************************
	 Implementacao dos metodos da classe Objeto
	********************************************************************/
	
	
	//Implementacao para o metodo start
	public function Criar() {
		super.Criar();
		
		vestir = FindObjectOfType(typeof(Vestir)) as Vestir;
	}


	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		drag = false;
		
		if (valida) {
			
			if (!ok && Validar()) {
				gameObject.transform.position = destino.transform.position;
				drag = true;
				vestir.pontos += 1;				
				
				//Audio
				if (vestir.pontos < 4) {
					Debug.Log("Audio!");
					var audio: AudioSource = GetComponent.<AudioSource>();
					audio.Play();
				}
				
				
			} else if (!Validar()){
				valida = false;
				vestir.coletorGame.SetErro();
				
			}
		//Ira coletar os erros de peça errada.	
		}else{
			vestir.coletorGame.SetDragDrop(); //Avaliar se esta correto aqui.
		}
		
		vestir.coletorGame.VerificaMaiorDelay();
	}
	
	//Detecta quando uma peca encontra outra peca.
	function OnTriggerEnter2D(colisor: Collider2D) {
		//Se colidir com qualquer outra peca ira ser validar.
		colidiuOutraPeca = true; 
		//peca que colidiu
		var colidiu;
		if (gameObject.tag != "Tres") {
			colidiu = colisor.gameObject.tag == gameObject.tag;
		} else {
			if (!vestir.tenis) {
				colidiu = colisor.gameObject.tag == gameObject.tag;
				vestir.tenis = true;
			} else if (colisor.gameObject.tag == "Tres") {
				colidiu = true;
			}
		}
		
		if (colidiu && drag) {
			//Destino guarda a peca que foi associada
			destino = colisor.gameObject;
			valida = true;
		} else {
			valida = false;
		}
	}
	
	//Detecta quando a peca sai da colicao de outra peca.
	function OnTriggerExit2D(colisor : Collider2D){
		colidiuOutraPeca = false;
		
		if (colisor.gameObject.tag == gameObject.tag && drag) {
	    	//valida = false;
	    }
	}
	
	function Validar() {
		if (gameObject.tag == TENIS) {
			 var meia = GameObject.FindGameObjectsWithTag(MEIA) as GameObject[];
			 
			 var meiaScript: ObjetoVestir = null;
			 var cont = 0;
			 while (meiaScript == null) {
			 	meiaScript = meia[cont++].GetComponent(ObjetoVestir);	 	
			 }
			 
			 if (meiaScript.ok) {
			 	ok = true;
			 	return true;	
			 } else {
			 	return false;
			 }
		}
		ok = true;
		return true;
	}
}