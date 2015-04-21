#pragma strict

public static final var x = 0; //Delay para as peças chegarem.
public static final var y = -4;

//Unidades.
public var unidade: GameObject;
public var qtUnidades: int;
private var unidadeMomento: GameObject; //Sera a do atual momento sempre.

//Usado para saber se e uma nova peça ou nao, para poder ser criado outra. Ver Maca.js
public var seNovo: boolean;

//Conta que sera impressa na tela.
public var conta: GUIText;

//Skin do botao conferir.
public var skinConferir: GUISkin;

//Guarda o valor total da soma.
private var resultTotal : int;

//Usados na troca de dados com o Script Maca.
public var resultArea: int;

//Erros presentes nos jogos.
public var erros: int;

//Janela popup.
private var popupScript: Popup;

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

//Criada para permitir ou nao o click no botao conferir.
public var clickPermitido: boolean;

//Variavel que ira tratar do audio.
private var musicaScript: Musica;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
private var csScript : CsColetor;


function Awake () {

	csScript = this.GetComponent("CsColetor");
	
}

function Start () {
	seNovo = false;
	clickPermitido = true;	
		
	DefinirConta();
	
	popupScript = FindObjectOfType(typeof(Popup)) as Popup;
	
	unidadeMomento = Instantiate(unidade,  Vector2(x, y), Quaternion.identity);
	
	musicaScript = FindObjectOfType(typeof(Musica)) as Musica;
	//musicaScript.GetInstance() = null;
	//Destroy(musicaScript.GetInstance()); // Observar.
}

function Update () {
	if (seNovo && qtUnidades > 0) {
		//unidades.RemoveAt(0);
		qtUnidades--;
		if (qtUnidades > 0) {
			unidadeMomento = Instantiate(unidade,  Vector2(x, y), Quaternion.identity);
			seNovo = false; //evita que tremam por criar todas juntas.
		}
		
		//Verificar.
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
		coletorGame.VerificaMaiorDelay();
		
	}/*else if(resultTotal == resultArea){
		PlayerCompletaGame();
	}*/
}

function OnGUI (){

	//Posicao do botao conferir.
	var XBOTAO = Screen.width - 220;
	var YBOTAO = Screen.height - 190;
	//Caracteristicas do Botao.
	var LARGURA_BOTAO = 230;
	var ALTURA_BOTAO = 190;
	
	GUI.skin = skinConferir;
	var conferindo = GUI.Button(new Rect(XBOTAO , YBOTAO, LARGURA_BOTAO, ALTURA_BOTAO), "");
	
	if(clickPermitido && conferindo){
		if(resultTotal == resultArea){
			coletorGame.SetAcerto();
			PlayerCompletaGame();
			clickPermitido = false;
		}else{
			coletorGame.SetErro();
			var contaTemp = conta.text;
			conta.text = "Errado!"; // Acontece muito rapido.
			print("Errado!");
			conta.text = contaTemp;		
		}
	}
}

//Definindo a conta que sera apresentada.
function DefinirConta () {
	var v1 = Random.Range(1, 5);
	var v2 = Random.Range(0, 5);
	resultTotal = v1 + v2;
	
	conta.text = v1.ToString() + "  +  " + v2.ToString();
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
	//Entrada para o banco de dados.
}

//Usados na comunicacao entre maca -> Principal -> Coletor.
public function AddErro () {
	coletorGame.SetErro();
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}
//Criar um botao que ira ter a opçao de passar de conta.
public function AddStep () {
	coletorGame.SetStep();
}
