#pragma strict

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

private var largura = 400;
private var altura = 200;

public var skin: GUISkin;

private var textoLogin = "Login";

private var passagemLiberada = false;


//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;

function Awake (){
	csScript = this.GetComponent("CsColetor");
}

function Start () {

	janela = Rect(larguraTela/2 - largura/10, alturaTela/2 - altura/3, largura, altura);

}

function Update () {}

function OnGUI () {
	
	if(habilitar){
		GUI.skin = skin; //Limpar fica muito grande
		janela = GUI.Window(0,janela,WindowFunction, "Entrar");
	}
}

function WindowFunction (windowID : int) {
	
	var dados = csScript.ReadFromFile();
	
	var loginField = GUI.TextField (Rect (largura-350,altura/3,300,35), textoLogin, 25);
	
	var sair = GUI.Button (Rect (largura-40,altura/10,35,35), "X");
	
	var pular = GUI.Button (Rect (largura-120,altura/1.5,100,35), "Pular");
	
	var login = GUI.Button (Rect (largura - 240,altura/1.5,100,35), "Entrar");
	
	var registrar = GUI.Button (Rect (largura - 360,altura/1.5,100,35), "Registrar");
	
	if(pular){
		habilita_Desabilita();
	}
	
	else if(sair){
		setHabilita(false);
	}
}

//--------------------------------------------
//Habilitar e desabilitar o pop-up.
function habilita_Desabilita(){
	if(habilitar != true){
		habilitar = true;
	}else{
		habilitar = false;
		livrePassagem();
	}
}

//-------------------------------------------
//--Get e Set do controlador para poder passar da tela de login para a suite.
function getPassagemLiberada(){
	return passagemLiberada;
}

function setPassagemLiberada ( valor : boolean){
	passagemLiberada = valor;
}
//-------------------------------------------
//Conferidor da permissao para passar para tela suite jogos.

function livrePassagem(){
	if (getPassagemLiberada() != true){
		setPassagemLiberada(true);
	}else{
		setPassagemLiberada(false);
	}
}

function setHabilita(valor: boolean){
	habilitar = valor;
}




