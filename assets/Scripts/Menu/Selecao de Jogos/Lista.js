#pragma strict

public var jogo: Jogo;
private var selecaoJogos : SelecaoJogos;

//Constantes
public static final var JOGOS = 11;

public static final var COR = 0;
public static final var QUANTO_E = 1;
public static final var SIMBO_NUMERO = 2;
public static final var CACHORRO = 3;
public static final var MENINA = 4;
public static final var PEIXE = 5;
public static final var TARTARUGA = 6;
public static final var COZINHA = 7;
public static final var ESCOLA = 8;
public static final var VESTIR = 9;
public static final var ONDE_ESTA_ROSTO = 10;

public var info = "";

private var boolArray = new boolean[JOGOS];
private var jogos = new Jogo[JOGOS];

public var skinLista1: GUISkin;
public var skinLista2: GUISkin;

function Start () {
	
	jogos[COR] = new Jogo("Cores", "Associar círculos coloridos\nà seus equivalentes.", 2);
	jogos[QUANTO_E] = new Jogo("Quanto é?", "Associar o sentido de \nquantidade com unidades \ne dezenas realizando uma \nsoma." , 1);
	jogos[SIMBO_NUMERO] = new Jogo("SimboNúmero", "Associar o sentido de \nquantidade com unidades \ne dezenas.", 1);
	jogos[CACHORRO] = new Jogo("Cachorro", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \ndo cachorro.", 4);
	jogos[MENINA] = new Jogo("Menina", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \nda menina.", 4);
	jogos[PEIXE] = new Jogo("Peixe", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \ndo peixe.", 4);
	jogos[TARTARUGA] = new Jogo("Tartaruga", "Estimular o raciocínio lógico \nresolvendo o quebra-cabeça \nda tartaruga.", 4);
	jogos[COZINHA] = new Jogo("Cozinha", "Estimular a memória xD", 3);
	jogos[ESCOLA] = new Jogo("Escola", "Estimular a memória xD", 3);
	jogos[VESTIR] = new Jogo("Vestir", "18+", 1);
	jogos[ONDE_ESTA_ROSTO] = new Jogo("Onde Está?", "Identificar e localizar partes \npresentes no rosto." , 2);
	
	jogos[QUANTO_E].setCena("Quanto E");
	jogos[TARTARUGA].setCena("QuebraCabeca");
	jogos[CACHORRO].setCena("QuebraCabeca");
	jogos[PEIXE].setCena("QuebraCabeca");
	jogos[COZINHA].setCena("Memoria");
	jogos[ESCOLA].setCena("Memoria");
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