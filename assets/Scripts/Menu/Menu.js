#pragma strict

public var botaoJogar: GUISkin;
public var botaoSobre: GUISkin;
public var botaoColeta: GUISkin;
public var botaoSair: GUISkin;
public var botaoMusica: GUISkin[];

private var scriptMusica: Musica;

public var teo: Texture2D;

//Janela coletor.
private var janelaColetor: JanelaColetor;

private var login: Login;

function Start () {
	
	janelaColetor = FindObjectOfType(typeof(JanelaColetor)) as JanelaColetor;
	
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
	
			
	GUI.DrawTexture(new Rect(x/8 - 70, y/8 + 155, teo.width/1.1, teo.height/1.08), teo);
	
	//Botao jogar
	GUI.skin = botaoJogar;
	var jogar = GUI.Button(new Rect(x + 180, y - 230, 280, 280), "");
	
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
	var musica = GUI.Button(new Rect(Screen.width - 120, Screen.height - 750, 90, 80), "");
	
	
	if (jogar) {
	
		if(login.getPassagemLiberada() == true){
			Application.LoadLevel("SuiteJogos");
		}else{
			login.habilita_Desabilita();
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
	
	//Troca de Skins ainda nao esta funcionando.
	else if(musica){
		if(scriptMusica.GetEstado()){
			scriptMusica.PauseOrPlay();
			print("Musica off");
		}else{
			scriptMusica.PauseOrPlay();
			print("Musica On!");
		}
	}
}