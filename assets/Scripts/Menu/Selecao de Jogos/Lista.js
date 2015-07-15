#pragma strict

public var jogo: String;
private var selecaoJogos : SelecaoJogos;

//Constantes
public static final var JOGOS = 7;

public static final var COR = 0;
public static final var QUANTO_E = 1;
public static final var SIMBO_NUMERO = 2;
public static final var TARTARUGA = 3;
public static final var HIPOPOTAMO = 4;
public static final var PINTINHO = 5;
public static final var ONDE_ESTA_ROSTO = 6;

public var info = "";

private var boolArray = new boolean[JOGOS];
private var jogos = new Jogo[JOGOS];

public var skinLista1: GUISkin;
public var skinLista2: GUISkin;

function Start () {
	
	jogos[COR] = new Jogo("Cor", "Associar circulos coloridos\na seus equivalentes.", 2);
	jogos[QUANTO_E] = new Jogo("Quanto é?", "Associar o sentido de \nquantidade com unidades \ne dezenas realizando uma \nsoma." , 1);
	jogos[SIMBO_NUMERO] = new Jogo("SimboNúmero", "Associar o sentido de \nquantidade com unidades \ne dezenas.", 1);
	jogos[TARTARUGA] = new Jogo("Tartaruga", "Estimular o raciocínio lógico \nresolvendo o quebra-cabecas \nda tartaruga.", 4);
	jogos[ONDE_ESTA_ROSTO] = new Jogo("Onde Esta?", "Identificar e localizar partes \npresentes no rosto." , 2);
	
	for (var i = 0; i < JOGOS; i ++) {
		boolArray[i] = false;
	}
}

public function Selecionar(categoria : String) {
	
}

public function Associacao() {
	Estilo(COR);
	
	//Distancia uns dos outros dos botoes da lista.
	var distanciaBotao1 = 0;
	
	var cor = GUI.Button (Rect (10,distanciaBotao1,250,60), "Cor");
	if (cor) {
		Validar(COR);
		
		info = "Associar circulos coloridos\na seus equivalentes.";
		
		jogo = "Cores";

		print(info);
	}
} 

public function Matematica() {
	Estilo(QUANTO_E);
	
	//Distancia uns dos outros dos botoes da lista.
	var distanciaBotao1 = 0;
	var distanciaBotao2 = 70;

	var quantoE = GUI.Button(Rect (10,distanciaBotao1,250,60), "Quanto é?");
	
	Estilo(SIMBO_NUMERO);
	var simboNumero = GUI.Button(Rect (10,distanciaBotao2,250,60), "SimboNúmero");
	
	if (quantoE) {
		Validar(QUANTO_E);
		jogo = "Quanto E";
		info = "Associar o sentido de \nquantidade com unidades \ne dezenas realizando uma \nsoma.";
		print(info);
	}
	
	if (simboNumero) {
		Validar(SIMBO_NUMERO);
		jogo = "SimboNumero";
		info = "Associar o sentido de \nquantidade com unidades \ne dezenas.";
		print(info);
	}
}

public function Puzzle() {
	Estilo(TARTARUGA);
	
	//Distancia uns dos outros dos botoes da lista.
	var distanciaBotao1 = 0;
	var distanciaBotao2 = 70;
	var distanciaBotao3 = 140;
	
	var tartaruga = GUI.Button (Rect (10,distanciaBotao1,250,60), "Tartaruga");
	
	/**
	Estilo(HIPOPOTAMO);
	var hipopotamo = GUI.Button (Rect (10,distanciaBotao2,250,60), "Hipopótamo");
	
	Estilo(PINTINHO);
	var pintinho = GUI.Button (Rect (10,distanciaBotao3,250,60), "Pintinho");
	**/
	
	if (tartaruga) {
		info = "Estimular o raciocínio lógico \nresolvendo o quebra-cabecas \nda tartaruga.";
		Validar(TARTARUGA);
		jogo = "Tartaruga";
		print("tartaruga");
	}
	/**
	if (hipopotamo) {
		info = "Estimular o raciocinio logico \nresolvendo o quebra-cabecas \ndo hipopotamo.";
		Validar(HIPOPOTAMO);
		print("HIpo");
	}
	
	if (pintinho) {
		info = "Estimular o raciocinio logico \nresolvendo o quebra-cabecas \ndo pintinho.";;
		jogo = "Pintinho";
		Validar(PINTINHO);
		print("Pinto");
	}
	**/	
}

public function OndeEsta() {
	Estilo(ONDE_ESTA_ROSTO);
	
	//Distancia uns dos outros dos botoes da lista.
	var distanciaBotao1 = 0;
	
	var ondeEstaRosto = GUI.Button (Rect (10,distanciaBotao1,250,60), "Onde Está?");
	
	if (ondeEstaRosto) {
		jogo = "Onde Esta";
		info = "Identificar e localizar partes \npresentes no rosto.";
		print(info);
		Validar(ONDE_ESTA_ROSTO);
	}
}

private function Estilo (jogo: int) {
	if (boolArray[jogo]) {
		GUI.skin = skinLista2;
	} else {
		GUI.skin = skinLista1;
		info = "ESCOLHA UM JOGO \n   PARA COMEÇAR"; //O segredo esta aqui pois, esse estilo indica que nao tem nada selecionado.
	}
}

public function Validar(jogo: int) {
	for (var i = 0; i < JOGOS; i ++) {
		if (i == jogo) {
			boolArray[i] = true;
		} else {
			boolArray[i] = false;
		}
	}
}