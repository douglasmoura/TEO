#pragma strict

/**
 * Classe que molda as roupas que serao arrastadas do jogo Vestir.
 * 
 * Author: Douglas
 * Date: 11/09/15
**/ 
public class ObjetoVestir extends Objeto {

	private var pecasDrag: MainQC;
	//Coletar o DragAndDrop;
	private var colidiuOutraPeca: boolean;
	
	
	
	/*******************************************************************
	 Implementacao dos metodos da classe Objeto
	********************************************************************/
	
	//Implementacao para o metodo start
	public function Criar() {
		super.Criar();
	}



	/*******************************************************************
	 Metodos que tratam eventos do objeto.
	********************************************************************/
	
	//Evento de quando soltar o mouse
	function OnMouseUp() {
		drag = false;
		
		if (valida) {
			gameObject.transform.position = destino.transform.position;
			drag = true;
		//Ira coletar os erros de peça errada.	
		}
		
	}
	
	//Detecta quando uma peca encontra outra peca.
	function OnTriggerEnter2D(colisor: Collider2D) {
		//Se colidir com qualquer outra peca ira ser validar.
		colidiuOutraPeca = true; 
		//peca que colidiu
		var colidiu = colisor.gameObject.tag == gameObject.tag;
		
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
	    	valida = false;
	    }
	}
}