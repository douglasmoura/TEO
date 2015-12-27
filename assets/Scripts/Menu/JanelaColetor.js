#pragma strict

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

public var imagemFundo : SpriteRenderer;

private var largura = 705;
private var altura = 705;

public var skin: GUISkin;
public var skinDados: GUISkin;

public var scrollPosition : Vector2 = Vector2.zero;

public var gatilho: boolean = true;

//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;
public var linhas: String[];


function Start () {
	csScript = this.GetComponent("CsColetor");
	
	var dados = csScript.ReadFromFile();
	
	linhas = dados.Split("!"[0]);

	janela = Rect(larguraTela/2 - largura/2, alturaTela/2 - altura/2, largura, altura);
}

function OnGUI () {
	
	if(habilitar){
		GUI.skin = skin; //Limpar fica muito grande
		
		imagemFundo.sortingLayerName = "GUI";
		imagemFundo.sortingOrder = 1;
		
		janela = GUI.Window(0,janela,WindowFunction, "");
	}
}

function WindowFunction (windowID : int) {
	
	var fechar = GUI.Button (Rect (380,20,120,50), "Sair");

	if(fechar){
		habilitar = false;
		
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
		
		print("Saiu!");
	}
	
	//GUI.skin = skinDados;
	
	scrollPosition = GUI.BeginScrollView (Rect (68, 82, largura - 40, altura - 120),scrollPosition, Rect (20, 100, largura + 690, altura + 3000));
	GUILayout.BeginArea(new Rect(68, 82, largura + 690, altura + 3000));
 	//Title row
 	//GUILayout.BeginHorizontal("box");
 	//Display the titles
 	//GUILayout.Label("Jogo", "button", GUILayout.Width(200));
 	//GUILayout.Label("Nível", "button", GUILayout.Width(130));
 	//GUILayout.Label("Acertos", "button", GUILayout.Width(130));
 	//GUILayout.Label("Erros", "button", GUILayout.Width(130));
 	//GUILayout.Label("Arrasta", "button", GUILayout.Width(130));
 	//GUILayout.Label("Passo", "button", GUILayout.Width(130));
 	//GUILayout.Label("Atraso", "button", GUILayout.Width(130));
 	//GUILayout.Label("Tempo (s)", "button", GUILayout.Width(200));
 	//GUILayout.EndHorizontal();
 	
 	//Draw the elements
 	var largura;
 	var altura;
 	for (var i : int = 0; i < linhas.Length - 1; i++) {
		var colunas = linhas[i].Split(","[0]);
 		GUILayout.BeginHorizontal();
 		
 		for (var o : int = 1; o < colunas.Length - 2; o++) {
 			/**
 			if (o == 0 || o == 7) {
 				largura = 200;
 			} else {
 				largura = 130;
 			}
 			**/
 			largura = 76;
 			altura = 90.5;
 			if (o == 4) {
 				largura = 81;
 			}
 			GUILayout.Label(colunas[o], GUILayout.Width(largura), GUILayout.Height(altura));
 		}
		GUILayout.EndHorizontal();
		if (i >= 65) {
			break;	
		}
  	}
  	
 	GUILayout.EndArea();
 	GUI.EndScrollView ();
}