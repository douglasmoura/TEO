#pragma strict

public var botaoJogar: GUISkin;
public var botaoSobre: GUISkin;
public var botaoColeta: GUISkin;
public var botaoSair: GUISkin;
public var botaoMusica: GUISkin[];
public var botaoFerramentas: GUISkin;

// Auxiliar ao Botao Ferramentas, proposta suspensa.
//public var clickFerramentas = false;

private var scriptMusica: Musica;


public var logo: Texture2D;

//Janela coletor.
private var janelaColetor: JanelaColetor;

private var login: Login;

function Awake () {

	janelaColetor = FindObjectOfType(typeof(JanelaColetor)) as JanelaColetor;

}

function Start () {
	
	scriptMusica = FindObjectOfType(typeof(Musica)) as Musica;
	
	login = FindObjectOfType(typeof(Login)) as Login;
}

function Update () {

}

function OnGUI() { 
	
	//Metade da largura da tela
	var x = Screen.width/2;
	//Metade da altura da tela
	var y = Screen.height/2;
	
	//Logo Canto da Tela.			
	//GUI.DrawTexture(new Rect(Screen.width/2 + 495, 20, logo.width/8, logo.height/8), logo);
	
	//Botao jogar
	GUI.skin = botaoJogar;
	var jogar = GUI.Button(new Rect(x + 180, y - 230, 260, 260), "");
	
	//Botao que representa a coleta de dados.
	GUI.skin = botaoColeta;
	var coleta = GUI.Button(new Rect(x + 60 , y - 10, 210, 210), "");
	
	//Botao sobre
	GUI.skin = botaoSobre;
	var sobre = GUI.Button(new Rect(x + 350, y + 10, 190, 190), "");
	
	//Botao sair
	GUI.skin = botaoSair;
	var sair = GUI.Button(new Rect(Screen.width - 240, Screen.height - 100, 484.0f/2, 174.0f/2), "");
	
	//Botao pause musica
	if(scriptMusica.GetEstado()){
		GUI.skin = botaoMusica[0];
	}else{
		GUI.skin = botaoMusica[1];
	}
	
	//Gatilho para o click do botao ferramentas.
	/*
	* Botao Ferramentas. Prospota suspensa.
	*
	if(clickFerramentas!= false){
		var musica = GUI.Button(new Rect(Screen.width - 260, Screen.height - 700, 90, 80), "");
	}
	
	GUI.skin = botaoFerramentas;
	var ferramentas = GUI.Button(new Rect(Screen.width - 260, Screen.height - 770, 90, 80), "");
	*/
	
	
	if (jogar) {
	
		if(login.getPassagemLiberada() == true){
			Application.LoadLevel("SuiteJogos");
		}else{
			//login.habilita_Desabilita();
			Application.LoadLevel("SuiteJogos");
		}
	}
	
	else if(coleta){
		janelaColetor.habilitar = true;
		print("Coleta!");
	}
	
	else if(sobre){
		print("Clicou em Sobre!");
	}
		
	else if (sair) {
		print("Saiu!");
		Application.Quit();
	}
	
	/*
	* Botao Ferramentas. Proposta Suspensa.
	*else if(ferramentas){
		if(clickFerramentas == false){
			clickFerramentas = true;
		}else{
			clickFerramentas = false;
		}
	}
	*/
	
	/*
	* Proposta incluido junto do botao ferramentas. Suspensa.
	*	
	else if(musica){
		if(scriptMusica.GetEstado()){
			scriptMusica.PauseOrPlay();
			print("Musica off");
		}else{
			scriptMusica.PauseOrPlay();
			print("Musica On!");
		}
	}
	*/
}