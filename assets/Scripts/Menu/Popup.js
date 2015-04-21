#pragma strict

private var janela : Rect;
private var dados : Rect;
//private var pause : boolean;
private var largura = 500;
private var altura = 370;

public var habilitar = false;

private var popUpDados : int[];

public var skin: GUISkin;

function Start () {
	janela = Rect(Screen.width/2 - largura/2, Screen.height/2 - altura/2, largura, altura);
	//pause = true;
}

function Update () {
	/**
	if (pause) {
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}
	**/
}

//Passando array de dados como parametro., para resgatar por index e apresentar "Nome" + valor;
//Atencao!!!
public function setDadosPopUp (dadosPopUp) {
	this.popUpDados = dadosPopUp;
}


function OnGUI () {
	if (habilitar) {
		GUI.skin = skin;
		janela = GUI.Window (0, janela, DoMyWindow, "Parabéns");
	}
}

function tempoJogo (tempo : int) {

	var segundos = tempo %60 + "";
	var minutos = (tempo/60)%60 + "";
	var horas = tempo/86400 + "";
	if(segundos.Length < 2){
		segundos = "0" + segundos;
	}
	if(minutos.Length < 2){
		minutos = "0" + minutos;
	}
	
	return "0" + horas + ":" + minutos + ":" + segundos;	
}

// Make the contents of the window
function DoMyWindow (windowID : int) {
	
	GUI.Box (Rect (55, 100, largura - 110, 90),"Tempo : " + tempoJogo(popUpDados[4]) + "\n" + "Erros: " + popUpDados[1] + "\n" + "Tentativas Totais: " + popUpDados[2] + "\n" + "Maior Atraso: " + tempoJogo(popUpDados[5]));
	GUI.Label (Rect (25, 140, largura - 20, 200), "Você gostaria de jogar novamente?");
	
	
	if (GUI.Button (Rect (110,300,130,50), "Sim")) {
		//pause = false;
		print ("Sim");
		Application.LoadLevel(Application.loadedLevelName);
	}
	
	if (GUI.Button (Rect (260,300,130,50), "Não")) {
		//pause = true;
		print ("Não");
		Application.LoadLevel("SuiteJogos");
	}
	
	GUI.DragWindow (Rect (0,0,10000,10000));
}

function Habilita () {
	if(!habilitar){
		habilitar = true;
	}else{
		Debug.Log("Ja esta ativo!");
	}
}

function Desabilita () {
	if(habilitar){
		habilitar = false;
	}else{
		Debug.Log("Ja esta desativado!");
	}
}