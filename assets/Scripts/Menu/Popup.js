#pragma strict

/*
*
* POPUP que aparece no final de cada jogo trazendo as informaçoes sobre o GameObject.
*
*
*/


private var janela : Rect;
private var dados : Rect;
//private var pause : boolean;
private var largura = 500;
private var altura = 450;

public var habilitar = false;

private var popUpDados : int[];

public var skin: GUISkin;

public var fontePopUp : Font;

function Start () {
	janela = Rect(Screen.width/2 - largura/2, Screen.height/2 - altura/2, largura, altura);
}

function Update () {}

public function setDadosPopUp (dadosPopUp) {
	this.popUpDados = dadosPopUp;
}


function OnGUI () {
	if (habilitar) {
		GUI.skin = skin;
		janela = GUI.Window (0, janela, DoMyWindow, "");
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
	
	//GUI.Box (Rect (55, 100, largura - 110, 90),"Tempo : " + tempoJogo(popUpDados[4]) + "\n" + "Erros: " +  + "\n" + "Tentativas Totais: " + popUpDados[2] + "\n" + "Maior Atraso: " + tempoJogo(popUpDados[5]));
	
	GUI.contentColor = new Color(0.65f, 0.12f, 0.45f, 0.8f);
	GUI.skin.font = fontePopUp;
	
	//Acertos
	GUI.Label (Rect (35, 50, largura - 20, 150), "<size=30>" + popUpDados[0] + "</size>");
	
	//Tentativas
	GUI.Label (Rect (35, 70, largura - 20, 200), "<size=30>" + popUpDados[2] + "</size>");
	
	//Erros
	GUI.Label (Rect (-5, 118, largura - 20, 200), "<size=30>" + popUpDados[1] + "</size>");
	
	//Atraso
	GUI.Label (Rect (50, 160, largura - 20, 200), "<size=30>"+ tempoJogo(popUpDados[5]) + "</size>");
	
	//Tempo
	GUI.Label (Rect (60, 203, largura - 20, 200), "<size=30>"+ tempoJogo(popUpDados[4]) + "</size>");
	
	//Ajuda/Step
	GUI.Label (Rect (-5, 245, largura - 20, 200), "<size=30>" + popUpDados[6] + "</size>");
	
	
	if (GUI.Button (Rect (110,380,130,50), "Sim")) {
		print ("Sim");
		Application.LoadLevel(Application.loadedLevelName);
	}
	
	if (GUI.Button (Rect (260,380,130,50), "Não")) {
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