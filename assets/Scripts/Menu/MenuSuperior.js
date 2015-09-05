#pragma strict

public var botaoHome: GUISkin;
public var botaoJogos: GUISkin;
//public var logo: Texture2D;
private var nivel: Nivel;
private var habilita = true;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
}

function OnGUI() {
	if (!habilita) {
		GUI.enabled = false;
		GUI.color.a = 0.5f;
	}
	
	//Define skin do menu
	GUI.skin = botaoHome; 
	
	//Metade da largura da tela
	var x = Screen.width/2;
	//Metade da altura da tela
	var y = Screen.height/2;
	
	//Botao home
	var home = GUI.Button(new Rect(-40 , -15, 791/3.2, 440/2.8), "");
	
	GUI.skin = botaoJogos;
	var jogos = GUI.Button(new Rect(-52, Screen.height - 145, 220, 180), "");
		
	if (home) {
		Application.LoadLevel("Menu");
	}
	
	if (jogos) {
		Application.LoadLevel("SuiteJogos");
		nivel.Destruir();
	}
}

public function Desabilitar() {
	habilita = false;
}