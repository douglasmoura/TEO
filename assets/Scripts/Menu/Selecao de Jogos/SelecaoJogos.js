#pragma strict

/**
 * Script responsavel pela tela de seleçao de jogos, conta 
 * Objeto possui um ponto de origem e retorna ao mesmo sempre que for associado
 * ao objeto errado.
 *
 * Author: Douglas
 * Date: 21/06/15
**/ 

public var skins: GUISkin[]; //Array com as skins das categorias
public var botoes: boolean[]; //Array com o valor bool dos botoes das categorias
public var jogos: String[]; //Nome das categorias dos jogos

//Demais Skins
public var skinPopUp: GUISkin;
public var skinTitulo: GUISkin;
public var skinJogar: GUISkin;
public var skinVoltar: GUISkin;
public var skinLista: GUISkin;
public var infoSkin: GUISkin;

//Constantes
public static final var ASSOCIACAO = "Associação";
public static final var MATEMATICA = "Matemática";
public static final var PUZZLE = "Puzzle";
public static final var MEMORIA = "Memória";
public static final var ONDE_ESTA = "Onde Está?";
public static final var AVD = "AVD";

private var lista: Lista; //Script que gerencia a lista de jogos
private var nivelGUI: NivelGUI; //Script que gerencia a visualizacao do nivel

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

function OnGUI () {
		
	var largura = 450;
	var altura = 198;
	
	for (var i: int = 0; i < 6; i++) {
		GUI.skin = skins[i];
		botoes[i] = GUI.Button(new Rect(largura, altura, 577/3, 577/3), "");
		
		largura += 200;
		
		if (i == 2) {
			largura = 450;
			altura += 200;
		}
		
		if (!popUp) {
			if (botoes[i]) {
				popUp = true;
				jogo = jogos[i];
			}
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