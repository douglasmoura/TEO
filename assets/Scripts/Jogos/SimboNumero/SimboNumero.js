#pragma strict

static var TEMPO_ROLETA = 6;

public var numeros: GameObject[];

public var primeiro: GameObject;

public var habilita = true;

public var comecaContagem = false;

public var bloqueador: GameObject;

public var valor = 0;

public var resultado = "";

public var controle = 0;

public var skinConferir: GUISkin;
//Janela popup.
private var popupScript: Popup;

//Responsavel pela coleta. Vide Script Coletor.js;
public var coletorGame: Coletor;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
private var csScript : CsColetor;

function Awake(){
	csScript = this.GetComponent("CsColetor");
}

function Start () {

	popupScript = FindObjectOfType(typeof(Popup)) as Popup;
	
}

function Update () {
	if (habilita) {
		girarRoleta();
	}
	
	if (controle == 3) {
		Inverter(resultado);
		print("final " + resultado);
		controle = -1;
	}
	//Restringir para que comece a contar apenas quando acabar de girar.
	if(comecaContagem){
		coletorGame.SetTempoTotal(Time.timeSinceLevelLoad - TEMPO_ROLETA);
		coletorGame.VerificaMaiorDelay();
	}
}

function girarRoleta() {
	var limite = Random.Range(1, 12);
	var parar = Random.Range(0, 10);
	
	print(parar);
	
	Sortear(6.18, limite, parar);
	
	limite = Random.Range(13, 19);
	
	if (parar == 0) {
		parar = Random.Range(1, 3);
	} else {
		parar = Random.Range(0, 2);
	}
	
	print(parar);
	Sortear(4.8, limite, parar);
	limite = Random.Range(25, 30);
	Sortear(3.45, limite, 0);
	habilita = false;	
}

function Inverter(entrada:String) {
	var temp = "";
	for (var i = entrada.length - 1; i >= 0; i--) {
			temp += entrada[i];
	}
	resultado = temp;
	print("Temp " + temp);
}

function Sortear(x:float, limite:int, parar:int) {

	var index = 0;
	
	var contador = 0;

	print("Limite " + limite);
	
	var indexSub = -1;
	
	while (contador < limite || indexSub != parar) {
		print("Valor do index " + (index - 1));
		print("Contador do limite: " + contador + "; limite: " + limite);
		primeiro = Instantiate(numeros[index],  Vector2(x, 2.63), Quaternion.identity);
		
		//if (index == parar) {
		//	break;
		//}
		
		index = (index + 1) % numeros.Length;
		
		yield WaitForSeconds(.2);
		contador += 1;
		
		if (index == 0) {
			indexSub = 9;
		} else {
			indexSub = index - 1;
		}
	}
	
	var resultado2 = (index - 1) % numeros.Length;
	
	if (resultado2 == -1) {
		resultado2 = 9;
	}
	
	Instantiate(bloqueador,  Vector2(x, 1.42), Quaternion.identity);
	
	resultado += resultado2;
	controle += 1;
}

function OnGUI() {
	if (controle == -1) {
		var XBOTAO = Screen.width - 220;
		var YBOTAO = Screen.height - 190;
		GUI.skin = skinConferir;
		var confirmar = GUI.Button(Rect(XBOTAO, YBOTAO,230,190),"");
		comecaContagem = true;
		if (confirmar) {
			Verificar();
		}
	}
}

function Verificar() {
	var temp = int.Parse(resultado);
	Debug.Log(temp + " " + valor);
	if (temp == valor) {
		coletorGame.SetAcerto();
		PlayerCompletaGame();
	} else {
		coletorGame.SetErro();
	}
}

//Funcao que escreve os dados e apresenta ao final da partida.
function PlayerCompletaGame(){

	popupScript.habilitar = true;
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	
	//Escreve os dados no arquivo.csv
	csScript.SaveToFile(coletorGame.RetornaString());
	
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	popupScript.setDadosPopUp(dadosPopUp);
	//Entrada para o banco de dados.
	coletorGame.ConfereDados();
	
}

public function AddDragDrop () {
	coletorGame.SetDragDrop();
}
//Criar um botao que ira ter a opçao de passar de conta.
public function AddStep () {
	coletorGame.SetStep();
}