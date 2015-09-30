#pragma strict

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

private var largura = 530;
private var altura = 370;

public var skin: GUISkin;
public var skinDados: GUISkin;

public var scrollPosition : Vector2 = Vector2.zero;

public var gatilho: boolean = true;

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
		
	scrollPosition = GUI.BeginScrollView (Rect (20, 100, largura - 40, altura - 120),scrollPosition, Rect (20, 100, largura + 640, altura + 3000));
	
	GUI.Box (Rect (20, 100, largura + 640, altura + 3000),"");
	//<size=20>    Jogo     |  Nível | Acertos | Erros | Tenativas | Arrasta | Tempo (s) | Atraso | Passo | \n"  + "</size>
	
	GUI.Button(new Rect(20, 100, 140, 50), "Jogo");
	GUI.Button(new Rect(160, 100, 140, 50), "Nível");
	GUI.Button(new Rect(300, 100, 140, 50), "Acertos");
	GUI.Button(new Rect(440, 100, 140, 50), "Erros");
	GUI.Button(new Rect(580, 100, 140, 50), "Arrasta");
	GUI.Button(new Rect(720, 100, 140, 50), "Passo");
	GUI.Button(new Rect(860, 100, 140, 50), "Atraso");
	GUI.Button(new Rect(1000,100, 190, 50), "Tempo (s)");
	
	
	GUI.skin = skinDados;
	
	//GUI.Button(new Rect(20, 150, 140, 50), "SimboNumero");
	
	if(gatilho) ModelarTabela(dados);
	
	//Debug.Log(dados);
	
	GUI.EndScrollView ();
	
	
}

/*function ModelarTabela (dados:String) {
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
}*/

function ModelarTabela (dados: String)
{
	var posiX = 20;
	var posiY = 150;
	
	var valor = "";
	
	for(var i = 0; i < dados.Length ; i++)
	{
		valor += dados[i];
	}
	
	var v1 = valor.Split('!'[0]);
	
	for (var x = 0 ; x < v1.Length; x++) {
	
		var v2= v1[x].Split(','[0]);
		
		for(var y = 0; y < v2.Length; y++){
		
			Debug.Log("Criando: " + v2[y]);
			
			GUI.Box(new Rect(posiX, posiY, 140, 50),v2[y] + "");
			
			posiX += 140;
		}
		
		posiX += 50;
		
	}
	
	this.gatilho = false;
}




