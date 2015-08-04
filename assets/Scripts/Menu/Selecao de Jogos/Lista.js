#pragma strict

public var jogo: Jogo;
private var selecaoJogos : SelecaoJogos;

//Constantes
public static final var JOGOS = 9;

public static final var COR = 0;
public static final var QUANTO_E = 1;
public static final var SIMBO_NUMERO = 2;
public static final var CACHORRO_1 = 3;
public static final var CACHORRO_2 = 4;
public static final var MENINA = 5;
public static final var PEIXE = 6;
public static final var TARTARUGA = 7;
public static final var ONDE_ESTA_ROSTO = 8;

public var info = "";

private var boolArray = new boolean[JOGOS];
private var jogos = new Jogo[JOGOS];

public var skinLista1: GUISkin;
public var skinLista2: GUISkin;

function Start () {
	
	jogos[COR] = new Jogo("Cores", "Associar círculos coloridos\nà seus equivalentes.", 2);
	jogos[QUANTO_E] = new Jogo("Quanto é?", "Associar o sentido de \nquantidade com unidades \ne dezenas realizando uma \nsoma." , 1);
	jogos[SIMBO_NUMERO] = new Jogo("SimboNúmero", "Associar o sentido de \nquantidade com unidades \ne dezenas.", 1);
	jogos[CACHORRO_1] = new Jogo("Cachorro 1", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \ndo cachorro.", 4);
	jogos[CACHORRO_2] = new Jogo("Cachorro 2", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \ndo cachorro.", 4);
	jogos[MENINA] = new Jogo("Menina", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \nda menina.", 4);
	jogos[PEIXE] = new Jogo("Peixe", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \ndo peixe.", 4);
	jogos[TARTARUGA] = new Jogo("Tartaruga", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \nda tartaruga.", 4);
	jogos[ONDE_ESTA_ROSTO] = new Jogo("Onde Está?", "Identificar e localizar partes \npresentes no rosto." , 2);
	
	jogos[QUANTO_E].setCena("Quanto E");
	jogos[TARTARUGA].setCena("QuebraCabeca");
	jogos[CACHORRO_1].setCena("QuebraCabeca");
	jogos[CACHORRO_2].setCena("QuebraCabeca");
	jogos[ONDE_ESTA_ROSTO].setCena("Onde Esta");
	
	for (var i = 0; i < JOGOS; i ++) {
		boolArray[i] = false;
	}
	
	Validar(-1);
}

public function Listar(inicio: int, fim : int) {
	var altura = 0;
	for (var i = inicio; i < fim; i++) {
		Estilo(i);
		var botao = GUI.Button(Rect (10, altura, 250, 60), jogos[i].GetNome());
		
		if (botao) {
			Validar(i);
			jogo = jogos[i];
			info = jogos[i].GetDescricao();
		}
		
		altura += 70;
	}
}

private function Estilo (jogo: int) {
	if (boolArray[jogo]) {
		GUI.skin = skinLista2;
	} else {
		GUI.skin = skinLista1;
	}
}

public function Validar(jogo: int) {
	var valida = false;
	for (var i = 0; i < JOGOS; i ++) {
		if (i == jogo) {
			boolArray[i] = true;
			valida = true;
		} else {
			boolArray[i] = false;
		}
	}
	
	if (!valida) {
		info = "Selecione um jogo e seu\nnível para começar.";
	}
}