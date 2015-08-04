#pragma strict

public var pecas: GameObject[];

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

public var erros = 0;
public var jogou: boolean;

//Variavel auxiliar para sair da funcao update.
public var completou = false;

//Script do popup de informacao dos dados no final da partida.
private var popupScript: Popup;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
private var csScript : CsColetor;

private var elementos: Elementos;
public var texturas: Object[];

function Awake() {

	
}

function Start () {
	csScript = this.GetComponent("CsColetor");
	
	popupScript = FindObjectOfType(typeof(Popup)) as Popup;
	
	elementos = FindObjectOfType(typeof(Elementos)) as Elementos;
	
	embaralhar();
}

function Update () {
	if(jogou){
		coletorGame.VerificaMaiorDelay();
		jogou = false;
	}
	if (GetTamanho() == 0 && !completou) { // So completou quando passar por essa funcao. Porem e a mesma coisa de ja ter completado, apenas para parar o update.
		coletorGame.SetErro(erros);
		PlayerCompletaGame();
		completou = true; // Apenas para sair do update.
	}else{
	
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	}
}

function embaralhar() {
	var pasta = elementos.nivel.jogo + "/Pecas";
	Debug.Log("Pasta " + pasta);
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
	Debug.Log("Array " + texturas);
 
    for (var i : int = 0; i < pecas.Length; i++) {
        var primeiro : int = Random.Range(i, pecas.Length);
        var segundo = pecas[i].transform.position;
        
        pecas[i].transform.position = pecas[primeiro].transform.position;
        Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
        pecas[primeiro].transform.position = segundo;
        pecas[i].GetComponent(SpriteRenderer).sprite = texturas[i];
    }
}

function GetTamanho() {
	var tamanhoAtual = 0;
	
	for (var i in pecas) {
		if (i != null) {
			tamanhoAtual++;
		}	
	}
	
	return tamanhoAtual;
}

//Funçao para que possa ser apresentado e futuramente armazenado os dados coletados.
function PlayerCompletaGame(){

	popupScript.habilitar = true;
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	csScript.SaveToFile(coletorGame.RetornaString());
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	popupScript.setDadosPopUp(dadosPopUp);
	
	//A nivel de debug.
	coletorGame.ConfereDados();
	
	//Entrada para o banco de dados.
}


//Usados para coleta.
public function AddAcerto () {
	coletorGame.SetAcerto();
}

public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}

public function AddStep () {
	coletorGame.SetStep();
}