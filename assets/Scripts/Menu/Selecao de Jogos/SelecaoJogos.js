	#pragma strict

public var fundo: Texture2D;
public var atividades: Texture2D;
public var cachorro: Texture2D;

public var skinCores: GUISkin;
public var skinNumeros: GUISkin;
public var skinOndeEsta: GUISkin;
public var skinPuzzle: GUISkin;
public var skinMemoria: GUISkin;
public var skinAVD: GUISkin;
public var skinPopUp: GUISkin;
public var skinTitulo: GUISkin;
public var skinJogar: GUISkin;
public var skinVoltar: GUISkin;
public var skinLista: GUISkin;
public var infoSkin: GUISkin;

public static final var LARGURA = 1282;
public static final var ALTURA = 777;

public static final var ASSOCIACAO = "Associação";
public static final var MATEMATICA = "Matemática";
public static final var PUZZLE = "Puzzle";
public static final var MEMORIA = "Memória";
public static final var ONDE_ESTA = "Onde Está?";
public static final var AVD = "AVD";

private var lista: Lista;
private var nivelGUI: NivelGUI;

private var popUp = false;
private var janela : Rect;

private var jogo: String;

private var scrollPosition : Vector2 = Vector2.zero;

private var infoGames = "Clique em um Jogo \npara começar.";

function Start () {
	janela = Rect(Screen.width/2 - 750/2.7, Screen.height/2 - 560/2.2, 800, 600);
	lista = FindObjectOfType(typeof(Lista)) as Lista;
	nivelGUI = FindObjectOfType(typeof(NivelGUI)) as NivelGUI;
}

function Update () {

}

function OnGUI () {
	
	var xCachorro = 0;
	var yCachorro = 260;
	
	var larguraCachorro = 810/2.1 ;
	var alturaCachorro = 1012/1.8  ;

	GUI.DrawTexture(new Rect(0, 0, LARGURA, ALTURA), fundo);
	GUI.DrawTexture(new Rect(300, 40, 1007 - 150, 161 - 30), atividades);
	GUI.DrawTexture(new Rect(xCachorro, yCachorro,larguraCachorro , alturaCachorro), cachorro);
	
	var largura = 450;
	var altura = 198;
	
	GUI.skin = skinCores;
	var cores = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	largura += 200;
	
	GUI.skin = skinNumeros;
	var numeros = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	largura += 200;
	GUI.skin = skinPuzzle;
	var puzzle = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	largura = 450;
	altura += 200;
	GUI.skin = skinMemoria;
	var memoria = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	largura += 200;
	GUI.skin = skinAVD;
	var avd = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	largura += 200;
	GUI.skin = skinOndeEsta;
	var ondeEsta = GUI.Button(new Rect(largura , altura, 577/3, 577/3), "");
	
	if (!popUp) {
		if (cores) {
			popUp = true;
			jogo = ASSOCIACAO;
	}

		if (numeros) {
			popUp = true;
			jogo = MATEMATICA;
	}
	
		if (puzzle) {
			popUp = true;
			jogo = PUZZLE;
	}
	
		if (memoria) {
			popUp = true;
			jogo = MEMORIA;
	}
		
		if (ondeEsta) {
			popUp = true;
			jogo = ONDE_ESTA;
		}
		
		if (avd){
			popUp = true;
			jogo = AVD;
		}
	}
	
	if (popUp) {
		GUI.skin = skinPopUp;
		janela = GUI.Window (0, janela, DoMyWindow, "");
	}
}

function DoMyWindow (windowID : int) {

	//Label responsavel pelo info do jogo.
	GUI.skin = infoSkin;
	GUI.Label(Rect (360, 280, 345, 290), infoGames);

	GUI.skin = skinTitulo;
	GUI.Label (Rect (245, 45, 290, 70), jogo);
	
	GUI.skin = skinLista;
	
	scrollPosition = GUI.BeginScrollView (Rect (70,155,265,330),
			scrollPosition, Rect (10, 0, 155, 380));

	if (jogo == ASSOCIACAO) {
	
		lista.Associacao();
		infoGames = getInfoGame();
		
	} else if (jogo == MATEMATICA) {
		lista.Matematica();
		if(lista.info != "ESCOLHA UM JOGO \n   PARA COMEÇAR"){
			infoGames = getInfoGame();
			print(infoGames);
		}

	//Ainda nao implementado no script lista.	
	} else if (jogo == MEMORIA) {
		/*if(lista.info != "Clique em um Jogo \n para começar!"){
			infoGames = lista.info;
			print(infoGames);
		}*/
		
	} else if (jogo == PUZZLE) {
		lista.Puzzle();
		print(infoGames);
		if(lista.info != "ESCOLHA UM JOGO \n   PARA COMEÇAR"){
			infoGames = getInfoGame();
			print(infoGames);
		}
		
	} else if (jogo == ONDE_ESTA) {
		lista.OndeEsta();
		if(lista.info != "ESCOLHA UM JOGO \n   PARA COMEÇAR"){
			infoGames = getInfoGame();
			print(infoGames);
		}
	//Ainda nao implementado no script lista.		
	} else if (jogo == AVD) {
		/*if(lista.info != "Clique em um Jogo \n para começar!"){
			infoGames = lista.info;
			print(infoGames);
		}*/
		
	}
		
	
	GUI.EndScrollView ();
	
	nivelGUI.Exibir();
	
	GUI.skin = skinJogar;
	var jogar = GUI.Button(new Rect(645 , 437, 537/4.0, 500/4.0), "");
	
	GUI.skin = skinVoltar;
	var voltar = GUI.Button(new Rect(562 , 466, 537/4.5, 500/4.15), "");
	
	if (voltar) {
		infoGames = "ESCOLHA UM JOGO \n   PARA COMEÇAR";
		lista.Validar(-1);
		lista.jogo = "";
		nivelGUI.nivel.nivel = 1;
		popUp = false;
	}
	
	if (jogar) {
		var jogo = lista.jogo;
		if (jogo.Equals("Tartaruga")) {
			jogo += nivelGUI.nivel.nivel;
		}
		Application.LoadLevel(jogo);
	}
}

//Adiquirindo informaçao sobre o jogo direto da lista.
function getInfoGame (){
	return lista.info;
}