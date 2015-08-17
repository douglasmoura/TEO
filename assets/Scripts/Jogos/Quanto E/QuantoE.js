#pragma strict

//Unidades.
public var unidade: GameObject;
public var qtUnidades: int; 

//Usado para saber se e uma nova peça ou nao, para poder ser criado outra. Ver Maca.js
public var seNovo: boolean;

//Conta que sera impressa na tela.
public var primeiroValor: GUIText;
public var segundoValor: GUIText;
public var valorTotal: GUIText;

public var primeiro_valor: int;
public var segundo_valor: int;
private var valor_total: int;

//Futuramente gerar gets e sets.
public var primeiroValor_corrente = 0;
public var segundoValor_corrente = 0;

//Guarda o valor do primeiro e segundo circulo consecutivamente.
private var primeiroCirculo : int;
private var segundoCirculo: int;

//Janela popup.
private var popupScript: Popup;

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
private var csScript : CsColetor;

function Awake () {

	csScript = this.GetComponent("CsColetor");
	
}

function Start () {

	DefinirConta();
	
	popupScript = FindObjectOfType(typeof(Popup)) as Popup;
	

}

function Update () {


	if((primeiro_valor == primeiroValor_corrente) && (segundo_valor == segundoValor_corrente)){
		coletorGame.SetAcerto(2);
		PlayerCompletaGame();
	}else{
		//Verificando o tempo para informar ao termino.
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
		coletorGame.VerificaMaiorDelay();
	}

}

function OnGUI (){}

//Definindo os valores que serao apresentados e armazenados para serem conferidps.
function DefinirConta () {
	
	this.primeiro_valor = Random.Range(1, 5);
	this.primeiroValor.text = primeiro_valor.ToString();
	
	this.segundo_valor = Random.Range(1,5);
	this.segundoValor.text = segundo_valor.ToString();
	
	this.valor_total = primeiro_valor + segundo_valor;
	this.valorTotal.text = valor_total.ToString();
	
	Debug.Log(primeiro_valor);
	Debug.Log(segundo_valor);
	Debug.Log(valor_total);
	
}


//Funçao para que possa ser apresentado e futuramente armazenado os dados coletados.
function PlayerCompletaGame(){

	popupScript.habilitar = true;
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	popupScript.setDadosPopUp(dadosPopUp);
	
	//Passando os dados para o arquivo.
	csScript.SaveToFile(coletorGame.RetornaString());
	
	//A nivel de debug.
	coletorGame.ConfereDados();

}

//Usados na comunicacao entre maca -> Principal -> Coletor.
public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}