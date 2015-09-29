#pragma strict

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

private var largura = 530;
private var altura = 370;

public var skin: GUISkin;

public var scrollPosition : Vector2 = Vector2.zero;
public var scrollHorizontalPosition: float;

//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;

function Awake (){
	csScript = this.GetComponent("CsColetor");
}

function Start () {

	janela = Rect(larguraTela/2 - largura/2, alturaTela/2 - altura/2, largura, altura);

}

function Update () {}

function OnGUI () {
	
	if(habilitar){
		GUI.skin = skin; //Limpar fica muito grande
		janela = GUI.Window(0,janela,WindowFunction, "Coletor");
	}
}

function WindowFunction (windowID : int) {
	
	var dados = csScript.ReadFromFile();
	
	var fechar = GUI.Button (Rect (380,20,120,50), "Sair");

	if(fechar){
		habilitar = false;
		print("Saiu!");
	}
	
	//scrollHorizontalPosition = GUI.HorizontalScrollbar(Rect(30, 335,largura-90, altura - 120), scrollHorizontalPosition, 1.0f, 0.0f,10.0f);
	
	scrollPosition = GUI.BeginScrollView (Rect (20, 100, largura - 40, altura - 120),scrollPosition, Rect (20, 100, largura + 250, altura + 3000));
	
	GUI.Box (Rect (20, 100, largura + 250, altura + 3000),"<size=16> Jogo\t|  Nível\t|  Acertos|  Erros\t|  Tenativas|  Arrasta\t|  Tempo (s)\t|  Atraso|  Passo | </size> \n"
	+ ModelarTabela(dados));
	
	GUI.EndScrollView ();
	
	
}

function ModelarTabela (dados:String) {
	var tabela = "";
	for(var i = 0; i < dados.Length ; i++){
		if(dados[i].Equals('|')){
			tabela += "\n";
		}else if (dados[i].Equals(',')){
			tabela += "\t";
		}else {
			tabela += dados[i];
		}
	}
	return tabela;
}













