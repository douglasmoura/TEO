#pragma strict

public var escuro : Texture2D;

public static final var larguraTela = Screen.width;
public static final var alturaTela = Screen.height;

private var janela : Rect;
public var habilitar = false;

public var imagemFundo : SpriteRenderer;

private var largura = 860;
private var altura = 705;

public var skin: GUISkin;

//nome do jogo, nivel, dados
public var skins: GUISkin[];

public var scrollPosition : Vector2 = Vector2.zero;

public var gatilho: boolean = true;

//Script em C# responsavel por ler o arquivo csv e colocar os dados dentro da janela.
private var csScript : CsColetor;
public var linhas: String[];

public var icones : Texture2D[];

private var criar = false;
function Start () {
	csScript = this.GetComponent("CsColetor");
	
	var dados = csScript.ReadFromFile();
	
	linhas = dados.Split("!"[0]);

	janela = Rect(larguraTela/2 - largura/2, alturaTela/2 - altura/2, largura, altura);
}

function OnGUI () {

	GUI.depth = 1;
	
	if(habilitar){
		GUI.skin = skin; //Limpar fica muito grande
		
		imagemFundo.sortingLayerName = "GUI";
		imagemFundo.sortingOrder = 1;
		
		janela = GUI.Window(0,janela,WindowFunction, "");
		GUI.depth = 0;

		GUI.skin = skins[0];
		var alturaLinha = -50;
		var larguraB = 76;
	 	var alturaB = 120;
	 			
		GUILayout.BeginArea(new Rect(325, 110, largura + 690, altura + 3000));
		for (var i : int = 0; i < linhas.Length - 1; i++) {
			var colunas = linhas[i].Split(","[0]);
			GUI.DrawTexture (Rect (-50, alturaLinha, 660, 160), escuro);
 			GUILayout.BeginHorizontal();
 			
			for (var o : int = 0; o < colunas.Length - 2; o++) {
	 			
	 			if (o == 1) {
	 				continue;
	 			}
	 			
	 			if (o == 0) {
	 				larguraB = 150;
	 			} else {
	 				larguraB = 76;
	 			}
	 			var altura = 90.5;
	 			if (o == 4) {
	 				larguraB = 81;
	 			}
	 			GUILayout.Label(colunas[o], GUILayout.Width(larguraB), GUILayout.Height(alturaB));
	 		}
			GUILayout.EndHorizontal();
			if (i > 3) {
				break;	
			}
			alturaLinha += 110;
		}
		GUILayout.EndArea();
	}
}

function WindowFunction (windowID : int) {
	
	var fechar = GUI.Button (Rect (680,580,150,130), "");

	if(fechar){
		habilitar = false;
		
		imagemFundo.sortingLayerName = "Default";
		imagemFundo.sortingOrder = -1;
		
		print("Saiu!");
	}
	
	GUI.skin = skins[0];
}