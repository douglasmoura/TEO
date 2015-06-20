#pragma strict

public class ObjetoCor extends Objeto {
	//Script que gerencia o jogo das cores
	private var instanciador: MainCores;
	//Coletar o DragAndDrop;
	private var colidiuOutraPeca: boolean;

	public function Atualizar() {
		super.Atualizar();
		
		Debug.Log("Teste");
	}
	
	public function Criar() {
		super.Criar();
		
		instanciador = FindObjectOfType(typeof(MainCores)) as MainCores;
	}

}